const TheEndGenerator = require("../WorldGenerator/TheEndGenerator.js")
  , EndCityFeature = require("../StructureFeature/EndCityFeature.js")
  , NetherGenerator = require("../WorldGenerator/NetherGenerator.js")
  , WorldGenerator = require("../WorldGenerator/WorldGenerator.js");

class Dimension {
  constructor(levelSeed) {
    this.seed = levelSeed
    this.minHeight = 0;
    this.height = 256;
    this.generator = null;
    this.seaLevel = 64;
  }

  getMinHeight() {
    return this.minHeight
  }

  getHeight() {
    return this.height
  }

  /**
   * @returns {WorldGenerator}
   */
  getGenerator() {
    return this.generator
  }

  createGenerator() { }
}

class NetherDimension extends Dimension {
  constructor(levelSeed) {
    super(levelSeed);
    this.maxHeight = 128;
    this.height = 256;
    this.seaLevel = 32;
  }

  makeStructureFeatures(seed) {
    return []
  }

  createGenerator() {
    var result = new NetherGenerator(this, this.seed.low, null);
    this.generator = result;
    return result;
  }
}

class TheEndDimension extends Dimension {
  constructor(levelSeed) {
    super(levelSeed);
  }

  makeStructureFeatures(seed) {
    return [
      new EndCityFeature(seed)
    ]
  }

  createGenerator() {
    var result = new TheEndGenerator(this, this.seed.low, "minecraft:the_end");
    this.generator = result;
    return result;
  }
}

exports.Dimension = Dimension;
exports.TheEndDimension = TheEndDimension;
exports.NetherDimension = NetherDimension;