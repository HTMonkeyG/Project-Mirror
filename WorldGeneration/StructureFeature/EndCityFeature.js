const BlockVolume = require("../../ChunkStorage/BlockVolume.js");
const { MT } = require("../../Utils/RandomSource.js");
const { BlockPos } = require("../../Utils/Structs.js");
const TheEndGenerator = require("../WorldGenerator/TheEndGenerator.js");
const StructureFeature = require("./StructureFeature.js");

class EndCityFeature extends StructureFeature {
  constructor(worldSeedLow) {
    super(worldSeedLow);
    this.params = {
      spacing: 20,
      separation: 11,
      salt: 10387313,
      linearSeparation: false
    };
  }

  isFeatureChunk(random, chunkPos, levelSeedLow, dimension, generator) {
    var a = StructureFeature.getPotentialFeatureChunk(random, levelSeedLow, chunkPos.x, chunkPos.z, this.params);
    if (chunkPos.x != a.x || chunkPos.z != a.z)
      return false;
    if (!TheEndGenerator.isOutsideCentralIslandArea(chunkPos))
      return false;
    if (generator.getPreliminarySurfaceLevel(chunkPos.x << 4, chunkPos.z << 4) >= dimension.getMinHeight()
      && EndCityStart.getYPositionForFeature(chunkPos, dimension) >= 60)
      return true;
    return false
  }

  postProcess(random, chunkPos) {

  }
}

class EndCityStart {
  static getYPositionForFeature(chunkPos, dimension) {
    var a = dimension.getGenerator()
      , b = a.getBlockVolumeDimensions()
      , c = new MT((chunkPos.x + 10387313 * chunkPos.z) | 0)
      , blockVolume = new BlockVolume(b.x, b.y, b.z, "air", dimension.getMinHeight())
      , v13 = 5, v14 = 5, v16, v17;

    a.prepareHeights(blockVolume, chunkPos);
    v16 = (c.nextIntRaw() & 3) - 1;

    if (v16) {
      v17 = v16 - 1;
      if (v17) {
        v17 == 1 && (v14 = -5);
      } else
        v13 = v14 = -5;
    } else
      v13 = -5;

    var v18 = dimension.getHeight() - 1
      , d = [
        blockVolume.getAboveTopSolidBlock(new BlockPos(7, v18, 7)),
        blockVolume.getAboveTopSolidBlock(new BlockPos(7, v18, 7 + v14)),
        blockVolume.getAboveTopSolidBlock(new BlockPos(7 + v13, v18, 7)),
        blockVolume.getAboveTopSolidBlock(new BlockPos(7 + v13, v18, 7 + v14))
      ];

    return Math.min(...d);
  }
}

module.exports = EndCityFeature;