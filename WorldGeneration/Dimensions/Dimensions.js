const TheEndGenerator = require("../WorldGenerator/TheEndGenerator.js")
  , EndCityFeature = require("../StructureFeature/EndCityFeature.js")
  , WorldGenerator = require("../WorldGenerator/WorldGenerator.js");

class Dimension {
  constructor(levelSeed) {
    this.seed = levelSeed
    this.minHeight = 0;
    this.height = 256;
    this.generator = null;
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