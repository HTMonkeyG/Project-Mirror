const fs = require("fs")
  , pl = require("path")
  , { ChunkPos } = require("../Utils/Structs.js")
  , { LootTable } = require("./LootTable.js")
  , { MT } = require("../Utils/RandomSource.js")
  , Long = require("../Utils/Long.js");

var a = fs.readFileSync(pl.join(__dirname, "Registries/buriedtreasure.json"), "utf-8");

var b = new LootTable(a)

var levelSeedLow = Long.fromString("7092772274639221181").low
  , chunk = new ChunkPos(-48, 8)
  , c = MT.fromChunk(levelSeedLow, chunk);
c.nextIntRaw()
c_.setSeed(c.nextInt());

var items = b.getRandomItems(c_, {});
var result = new Array(27);
var index = b.getAvaliableSlots(result, c_);
console.log(items)
console.log(b.shuffleAndSplitItems(result, index, c_));