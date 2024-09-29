const fs = require("fs")
  , pl = require("path")
  , { LootTable } = require("./LootTable.js");

var a = fs.readFileSync(pl.join(__dirname, "Registries/end_city_treasure.json"), "utf-8");

var b = new LootTable(a)