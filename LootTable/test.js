const fs = require("fs")
  , pl = require("path")
  , { ChunkPos } = require("../Utils/Structs.js")
  , { LootTable } = require("./LootTable.js")
  , { MT } = require("../Utils/RandomSource.js");

var a = fs.readFileSync(pl.join(__dirname, "Registries/buriedtreasure.json"), "utf-8");

var b = new LootTable(a)

var levelSeedLow = 1540965085
  , chunk = new ChunkPos(0, -64)
  , c = new MT(levelSeedLow)
  , c_ = new MT(0)
  , d = c.nextInt() | 1
  , e = c.nextInt() | 1;
c.setSeed((d * chunk.x + e * chunk.z) ^ levelSeedLow);
c.nextIntRaw()
c_.setSeed(c.nextInt());

console.log(b.getRandomItems(c_, {}));
//console.log(b.getRandomItems(c, {}));