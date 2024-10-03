const { MT } = require("../Utils/RandomSource");

Array.prototype.randomShuffle = function (random) {
  for (var i = 1; i < this.length; i++) {
    var j = random.nextInt(i + 1)
      , k = this[i];
    this[i] = this[j];
    this[j] = k;
  }

  return this
};

function tryRead(v, d) {
  return v == void 0 ? d : v;
}

class ItemStack {
  static EMPTY = new ItemStack("air", 0, null);
  constructor(name, amount, param) {
    this.name = name;
    this.amount = amount;
    this.param = param || {};
  }
}

class LootTable {
  constructor(lootTable) {
    var pools = null;
    this.pools = [];
    if (typeof lootTable == "string")
      pools = JSON.parse(lootTable).pools;
    else
      pools = lootTable.pools;
    if (!pools)
      throw new Error();

    for (var pool of pools)
      this.pools.push(new LootPool(pool))
  }

  fill() {

  }

  getRandomItems(random, lootTableContext) {
    var result = [];
    for (var pool of this.pools)
      pool.addRandomItems(result, random, lootTableContext);
    //lootTableContext.removeVisitedTable(this);

    return result
  }

  shuffleAndSplitItems(result, index, random) {

  }

  getAvaliableSlots(container, random) {
    var result = [];
    if (container.length)
      for (var i = 0; i < container.length; i++)
        if (container[i] == null)
          result.push(i);

    return result.randomShuffle(random)
  }
}

class LootTableEntry { }

class LootPool {
  constructor(pool) {
    if (typeof pool != "object")
      throw new Error();

    this.rolls = new RandomValueBounds(pool.rolls);
    this.bonusRolls = pool.bonus_rolls != null ? new RandomValueBounds(pool.bonus_rolls) : new RandomValueBounds(0);

    this.conditions = [];
    if (pool.conditions)
      for (var condition of pool.conditions)
        this.conditions.push(new LootItemCondition(condition));

    if (pool.tiers)
      this.tiers = {
        initialRange: pool.tiers.initial_range || 0,
        bonusRolls: pool.tiers.bonus_rolls || 0,
        bonusChance: pool.tiers.bonus_chance || 0,
      }

    this.entries = [];
    if (pool.entries)
      for (var entry of pool.entries)
        this.entries.push(LootPoolEntry.deserialize(entry));
  }

  applyAllConditions(random, lootTableContext) {
    return true;
  }

  addRandomItems(items, random, lootTableContext) {
    if (this.applyAllConditions(random, lootTableContext)) {
      if (this.tiers) {
        var v11 = 0;
        if (this.tiers.initialRange > 0)
          v11 = random.nextInt(this.tiers.initialRange);

        for (var v10 = 0; v10 < this.tiers.bonusRolls; v10++)
          if (random.nextFloat() < this.tiers.bonusChance)
            v11++;

        if (v11 >= 0 && v11 < this.entries.length)
          this.entries[v11].createItem(items, random, lootTableContext)
      } else {
        var v14 = this.bonusRolls.getFloat(random)
          , v15 = v14 * 0//lootTableContext.getLuck()
          , v16 = Math.floor(v15)
          , v17 = this.rolls.getInt(random) + v16;
        while (v17) {
          this.addRandomItem(items, random, lootTableContext);
          v17--;
        }
      }
    }
  }

  addRandomItem(items, random, lootTableContext) {
    var selected = [], total = 0;
    for (var entry of this.entries) {
      if (entry.applyAllConditions(random, lootTableContext)) {
        var a = 0//lootTableContext.getLuck()
          , b = entry.getWeight(a);
        if (b > 0)
          selected.push(entry), total += b;
      }
    }

    if (!total) return;
    var w = random.nextInt(total);
    for (var entry of selected) {
      var a = 0//lootTableContext.getLuck();
      w -= entry.getWeight(a);
      if (w < 0) {
        entry.createItem(items, random, lootTableContext);
        return;
      }
    }

    throw new Error()
  }
}

class LootPoolEntry {
  static deserialize(entry) {
    switch (entry.type) {
      case "item":
        return new LootItemEntry(entry);
      case "loot_table":
        return new LootTableReferenceEntry(entry);
      case "empty":
        return new LootPoolEntry(entry);
      default:
        throw new Error(`Every entry of "entries" must specify a type of either "item", "loot_table", or "empty". Given: ${entry.type}`);
    }
  }

  constructor(entry) {
    this.type = entry.type;
    this.weight = tryRead(entry.weight, 1);
    this.quality = entry.quality || 0;
    this.functions = [];

    this.conditions = [];
    if (entry.conditions)
      for (var condition of entry.conditions)
        conditions.push(new LootItemCondition(condition));
  }

  applyAllConditions(random, lootTableContext) {
    return true
  }

  getWeight(a) {
    var v2 = Math.floor(this.quality * a + this.weight);
    return v2 > 0 ? v2 : 0;
  }

  createItem() { return ItemStack.EMPTY }
}

class LootItemEntry extends LootPoolEntry {
  constructor(entry) {
    super(entry);
    this.itemName = entry.name;
    this.functions = [];
    if (entry.functions)
      for (var func of entry.functions)
        this.functions.push(LootTableFunction.deserialize(func));
  }

  createItem(items, random, lootTableContext) {
    var result = new ItemStack(this.itemName, 1);
    if (!this.itemName) return 0;
    if (this.functions) {
      for (var func of this.functions)
        if (func.applyAllConditions(random, lootTableContext))
          func.apply(result, random, lootTableContext);
    }
    items.push(result);
  }
}

class LootTableReferenceEntry extends LootPoolEntry {
  constructor(entry) {
    super(entry);
    this.lootTableName = entry.name;
  }

  createItem(items, random, lootTableContext) { }
}

class LootTableContext { }

class LootItemCondition {
  static functions = {
    killed_by_player() { },
    killed_by_player_or_pets() { },
    killed_by_entity() { },
    entity_killed() { },
    random_chance() { },
    random_difficulty_chance() { },
    random_chance_with_looting() { },
    random_regional_difficulty_chance() { },
    has_mark_variant() { },
    has_variant() { },
    match_tool() { }
  };

  constructor(condition) {
    this.name = condition.condition
    switch (this.name) {
      case "killed_by_player":
      case "killed_by_player_or_pets":
        break;
      case "killed_by_entity":
      case "entity_killed":
        this.entityType = condition.entity_type;
        break;
      case "random_difficulty_chance":
        this.defaultChance = condition.default_chance || 0;
        this.peaceful = tryRead(condition.peaceful, this.defaultChance);
        this.easy = tryRead(condition.easy, this.defaultChance);
        this.normal = tryRead(condition.normal, this.defaultChance);
        this.hard = tryRead(condition.hard, this.defaultChance);
        break;
      case "random_chance_with_looting":
        this.lootingMultiplier = condition.looting_multiplier || 0;
      case "random_chance":
        this.chance = condition.chance || 0;
        break;
      case "random_regional_difficulty_chance":
        this.maxChance = condition.max_chance || 0;
        break;
      case "has_mark_variant":
      case "has_variant":
        this.value = condition.value || 0;
        break;
      case "match_tool": // Not exists in MCBE 1.20
        break;
      default:
        throw new Error();
    }
  }

  applies() {
    LootItemCondition.functions[this.name].apply(this, arguments)
  }
}

class LootTableFunction {
  static deserialize(func) {
    switch (func.function) {
      case "set_count":
        return new SetItemCountFunction(func);
      case "set_data":
        return new SetItemDataFunction(func);
      case "enchant_randomly":
        return new EnchantRandomlyFunction(func);
      default:
        throw new Error();
    }
  }

  constructor(func) {
    this.conditions = [];
    if (func.conditions)
      for (var condition of func.conditions)
        this.conditions.push(new LootItemCondition(condition));
    this.name = func.function;
  }

  applyAllConditions(random, lootTableContext) {
    return true
  }

  apply(item, random, lootTableContext) { }
}

class SetItemCountFunction extends LootTableFunction {
  constructor(func) {
    super(func);
    this.count = new RandomValueBounds(func.count);
  }

  apply(item, random, lootTableContext) {
    item.amount = this.count.getInt(random);
  }
}

class SetItemDataFunction extends LootTableFunction {
  constructor(func) {
    super(func);
    this.data = func.data || 0;
  }

  apply(item, random, lootTableContext) {
    item.param.data = this.data;
  }
}

class EnchantRandomlyFunction extends LootTableFunction {
  constructor(func) {
    super(func)
  }

  apply(item, random, lootTableContext) {
    item.param.enchantmentSeed = random.nextIntRaw();
  }
}

class RandomValueBounds {
  constructor(obj) {
    if (typeof obj == "number")
      this.min = this.max = obj;
    else
      this.min = obj.min, this.max = obj.max;
  }

  getFloat(random) {
    return (random.nextFloat() * (this.max - this.min)) + this.min;
  }

  getInt(random) {
    var a = Math.floor(this.max) + 1
      , result = Math.floor(this.min);
    if (result < a)
      result += random.nextInt(a - result);
    return result
  }
}

exports.LootTable = LootTable;
exports.LootItemCondition = LootItemCondition;
exports.LootPool = LootPool;
exports.LootPoolEntry = LootPoolEntry;
exports.LootTableEntry = LootTableEntry;
exports.LootTableContext = LootTableContext;
exports.LootTableFunction = LootTableFunction;