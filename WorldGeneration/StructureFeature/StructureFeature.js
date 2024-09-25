const { MT, RandomSource } = require("../../Utils/RandomSource.js")
  , Long = require("../../Utils/Long.js");
const { ChunkPos } = require("../../Utils/Structs.js");

class StructureFeature {
  /**
   * Set random seed with salt
   * @param {RandomSource} random 
   * @param {Number} x 
   * @param {Number} z 
   * @param {Number} salt 
   * @param {Number} levelSeedLow 
   */
  static setRandomSeedFor(random, cellX, cellZ, salt, levelSeedLow) {
    var e = Long.fromNumber(cellX);
    e = e.mul(Long.fromString("341873128712"));
    var f = Long.fromNumber(cellZ);
    f = f.mul(Long.fromString("132897987541"));
    e = e.add(salt);
    e = e.add(levelSeedLow);
    e = e.add(Long.fromNumber(d));
    return random.setSeed(e.toInt())
  }

  static getPotentialFeatureChunk(random, levelSeedLow, chunkX, chunkZ, params) {
    var b = Math.floor(chunkX / params.spacing)
      , c = Math.floor(chunkZ / params.spacing)
      , f
      , g
      , h = StructureFeature.setRandomSeedFor(
        random,
        b,
        c,
        params.salt,
        levelSeedLow);

    params.linearSeparation ? (
      f = h.nextInt(params.spacing - params.separation),
      g = h.nextInt(params.spacing - params.separation)
    ) : (
      f = (h.nextInt(params.spacing - params.separation) + h.nextInt(params.spacing - params.separation)) >> 1,
      g = (h.nextInt(params.spacing - params.separation) + h.nextInt(params.spacing - params.separation)) >> 1
    );

    return new ChunkPos(
      b * params.spacing + f,
      c * params.spacing + g
    )
  }

  constructor(worldSeedLow) {
    var a = new MT(worldSeedLow);
    this.modifier = [(a.nextInt() & 0xFFFFFFFE) + 1, (a.nextInt() & 0xFFFFFFFE) + 1];
    this.checkRange = 8;
  }

  postProcess(random) {

  }

  createStructureStart() { }

  createBlueprints(dimension, chunkPos) {
    var s = dimension.seed.low ^ (this.modifier[0] * chunkPos.x + this.modifier[1] * chunkPos.z);

    this.addFeature(dimension, new MT(s), chunkPos);
  }

  addFeature(dimension, random, chunkPos) {
    if (this.isFeatureChunk(random, chunkPos, levelSeedLow, dimension, generator));
  }

  isFeatureChunk(random, chunkPos, levelSeedLow, dimension, generator) { }
}

module.exports = StructureFeature;