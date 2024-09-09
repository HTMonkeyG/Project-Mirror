const BlockVolume = require("../ChunkStorage/BlockVolume.js");
const { BlockPos, ChunkPos } = require("../Utils/PosStorage.js")
  , { MT, Long } = require('../Utils/Basics.js');

function placeBedrockFloor(random, blockVolume, worldPos) {
  var bedrockHeight = (random.nextIntRaw() & 3) + 2
    , pos = new BlockPos(worldPos.x & 0xF, 0, worldPos.z & 0xF);
  console.log(bedrockHeight);

  for (; pos.y < bedrockHeight; pos.y++) {
    bedrockBlock = "minecraft:bedrock";
    blockVolume.data[blockVolume.index(pos)] = bedrockBlock;
  }
}

function loadChunk(chunkPos) {
  var random = new MT((341872712 * chunkPos.x | 0) + (132899541 * chunkPos.z | 0) | 0)
    , blockVolume = new BlockVolume(16, 384, 16);
  for (var x = 0; x < 15; x++) {
    for (var z = 0; z < 15; z++) {
      placeBedrockFloor(random, blockVolume, new BlockPos((chunkPos.x * 16) + x, 0, (chunkPos.z * 16) + z));
      random.nextFloat();
    }
  }

  console.log(blockVolume)
}

loadChunk(new ChunkPos(-16, -26))