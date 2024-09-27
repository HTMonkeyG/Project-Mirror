class LootTable {
  constructor(lootTable) {
    if (typeof lootTable == "string")
      this.lootTable = JSON.parse(lootTable).pools;
    else
      this.lootTable = lootTable.pools;
    if (!this.lootTable)
      throw new Error();
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

class LootPool { }

class LootTableContext { }

class LootItemCondition {

}