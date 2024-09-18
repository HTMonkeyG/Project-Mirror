const TheEndGenerator = require("./TheEndGenerator.js")
  , BlockVolume = require("../../ChunkStorage/BlockVolume.js");

var a = new TheEndGenerator(0x5BD942DD);

console.log(a.generateDensityCellsForChunk({ x: 17, z: 15 }))
