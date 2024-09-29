function tryRead(v, d) {
  return v == void 0 ? d : v;
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

  getRandomItems() {

  }

  shuffleAndSplitItems() {

  }

  getAvaliableSlots() {

  }
}

class LootTableEntry { }

class LootPool {
  constructor(pool) {
    if (typeof pool != "object")
      throw new Error();

    this.rolls = new RandomValueBounds(pool.rolls);
    this.bonusRolls = pool.bonus_rolls != null ? new RandomValueBounds(pool.bonus_rolls) : null;

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
        this.entries.push(new LootPoolEntry(entry));
  }
}

class LootPoolEntry {
  static functions = {
    item() { },
    loot_table() { },
    empty() { }
  };

  constructor(entry) {
    this.type = entry.type;
    this.weight = tryRead(entry.weight, 1);
    this.quality = entry.quality || 0;
    this.functions = [];

    this.conditions = [];
    if (entry.conditions)
      for (var condition of entry.conditions)
        conditions.push(new LootItemCondition(condition));

    switch (this.type) {
      case "item":
        this.itemName = entry.name;
        if (entry.functions)
          for (var func of entry.functions)
            this.functions.push(new LootTableFunction(func));
        break;
      case "loot_table":
        this.lootTableName = entry.name;
        break;
      case "empty":
        break;
      default:
        throw new Error(`Every entry of "entries" must specify a type of either "item", "loot_table", or "empty". Given: ${entry.type}`);
    }
  }

  createItem() {
    LootPoolEntry.functions[this.type].apply(this, arguments)
  }
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

class LootItem extends LootPoolEntry {

}

class EmptyLootItem extends LootPoolEntry { }

class LootTableReference extends LootPoolEntry { }

class LootTableFunction { }

class RandomValueBounds {
  constructor(obj) {
    if (typeof pool == "number")
      this.min = this.max = obj;
    else
      this.min = obj.min, this.max = obj.max;
  }
}

exports.LootItem = LootItem;
exports.LootTable = LootTable;
exports.LootItemCondition = LootItemCondition;
exports.LootPool = LootPool;
exports.LootPoolEntry = LootPoolEntry;
exports.EmptyLootItem = EmptyLootItem;
exports.LootTableEntry = LootTableEntry;
exports.LootTableContext = LootTableContext;
exports.LootTableReference = LootTableReference;
exports.LootTableFunction = LootTableFunction;