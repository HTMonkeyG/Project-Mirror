const { Vec3 } = require("project-mirror-utils");

class WorldGenerator {
  constructor(dimension, levelSeedLow, biome) {
    this.dimension = dimension;
    this.biome = biome;
    this.structureFeatures = dimension.makeStructureFeatures(levelSeedLow);
    this.seed = levelSeedLow;
  }

  generateDensityCellsForChunk() { }

  prepareHeights() { }

  loadChunk(chunkPos) { }

  postProcess() { }

  getPreliminarySurfaceLevel() { }

  buildSurfaces() { }

  getBlockVolumeDimensions() {
    return new Vec3(16, 256, 16)
  }

  postProcessStructureFeatures(random, chunkPos) {
    for (var a of this.structureFeatures)
      a.postProcess(random, chunkPos);
  }

  prepareStructureFeatureBlueprints() {
    for (var a of this.structureFeatures)
      a.createBlueprints(random, chunkPos, this);
  }
}

module.exports = { WorldGenerator };