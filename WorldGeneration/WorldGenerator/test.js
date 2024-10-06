const BlockVolume = require("../../ChunkStorage/BlockVolume.js");
const { ChunkPos } = require("../../Utils/Structs.js")
  , NetherGenerator = require("./NetherGenerator.js")
  //, NetherGenerator_ = require("./NetherGenerator.js.bak")
  , { NetherDimension } = require("../Dimensions/Dimensions.js")
  , fs = require("fs");

var a = new NetherGenerator(new NetherDimension(), 0x5BD942DD, null)

a.prepareHeights(new BlockVolume(16, 128, 16, "air"), new ChunkPos(4, 15))