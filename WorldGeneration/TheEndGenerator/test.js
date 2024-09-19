const TheEndGenerator = require("./TheEndGenerator.js")
  , BlockVolume = require("../../ChunkStorage/BlockVolume.js");

var a = new TheEndGenerator(0x5BD942DD);

//console.log(a.prepareHeights(new BlockVolume(16, 256, 16), { x: 0x44, z: 0x1b }))

exports.trigger = {
  main() {
    return JSON.stringify(a.prepareHeights(new BlockVolume(16, 256, 16, 'air'), { x: 0x44, z: 0x1c }))
  },
  url: "/BlockVolume"
}