const { ChunkPos, BlockPos } = require("../Structs.js");

class LevelChunk {
  constructor(dimension) {
    var hr = dimension.getHeightRange();

    this.pos = new ChunkPos(0, 0);
    this.minCorner = new BlockPos(
      this.pos.x << 4,
      hr.min,
      this.pos.z << 4
    );
    this.maxCorner = new BlockPos(
      this.minCorner.x + 15,
      hr.max,
      this.minCorner.z + 15
    );
    this.minHeight = hr.min;

    this.subchunkBlock = [];
    this.subchunkBiome = [];
  }

  setBlock() {

  }

  setBlockVolume(blockVolume, bias) {
    var maxHeight = blockVolume.getHighestNonAirBlock()
      , a;

    if (maxHeight == blockVolume.minHeight) {
      a = maxHeight + bias - blockVolume.minHeight;
    }
  }
}

module.exports = {
  LevelChunk
};