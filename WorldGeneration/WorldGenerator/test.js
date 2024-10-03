const { ChunkPos } = require("../../Utils/Structs.js")
  , NetherGenerator = require("./NetherGenerator.js")
  , NetherGenerator_ = require("./NetherGenerator copy.js")
  , { TheEndDimension } = require("../Dimensions/Dimensions.js")
  , fs = require("fs");

var a = new NetherGenerator(new TheEndDimension(), 0x5BD942DD, null)
var b = new NetherGenerator_(new TheEndDimension(), 0x5BD942DD, null)
var c;
c = b.generateDensityCellsForChunk(new ChunkPos(-1, 3))

var d = fs.readFileSync("./WorldGeneration/WorldGenerator/test2.dump", "utf-8");

d = d.replace(/[0-9A-F]{16} {7,8}/g, "");
d = d.replace(/\r\n/g, "       ");
d = d.split(/ {6,15}/);

for (var i = 0; i < d.length; i++) {
  d[i] = Number(d[i])
}

for (var i = 0; i < d.length; i++) {
  if(Math.abs(c[i] - d[i]) > Math.abs(c[i] * 0.001))
    throw i;
}
var e = [];

//console.log(b.generateDensityCellsForChunk(new ChunkPos(-1, 3)))