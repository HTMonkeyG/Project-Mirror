const TheEndGenerator = require("./TheEndGenerator.js")
  , BlockVolume = require("../../ChunkStorage/BlockVolume.js");

//console.log(a.prepareHeights(new BlockVolume(16, 256, 16), { x: 0x44, z: 0x1b }))

exports.trigger = {
  url: {
    "/BlockVolume": {
      main(params) {
        var a = new TheEndGenerator(Number(params.seed) | 0);
        return JSON.stringify(a.prepareHeights(
          new BlockVolume(16, 256, 16, 'air'),
          { x: Number(params.x), z: Number(params.z) }
        ))
      }
    }
  }
}