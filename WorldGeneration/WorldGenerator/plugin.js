const TheEndGenerator = require("./TheEndGenerator.js")
  , { TheEndDimension, NetherDimension } = require("../Dimensions/Dimensions.js")
  , NetherGenerator = require("./NetherGenerator.js")
  , BlockVolume = require("../../ChunkStorage/BlockVolume.js");

//console.log(a.prepareHeights(new BlockVolume(16, 256, 16), { x: 0x44, z: 0x1b }))

exports.trigger = {
  url: {
    "/block-volume": {
      main(params) {
        var a = new NetherGenerator(new NetherDimension(), Number(params.seed) | 0, void 0);
        return JSON.stringify(a.prepareHeights(
          new BlockVolume(16, 128, 16, 'air'),
          { x: Number(params.x), z: Number(params.z) }
        ))
      }
    }
  }
}