const { PerlinNoise } = require("./Noises.js")
  , { MT } = require("./RandomSource.js");

class MixerOperationNode {

}

class NormalNoiseOperationNode {
  constructor() {
    this.a = 0;
    this.b = 0x6957B26727512035n;
    this.c1 = 3;
    this.noiseLevel = 2;
    this.pNoise1 = null;
    this.pNoise2 = null;
  }

  init(seed) {
    const C1 = 0x5851F42D4C957F2Dn
      , C2 = 0x14057B7EF767814Fn;
    var v2 = BigInt(seed)
      , v5 = this.b
      , v6 = v5
        + (C1 * (v5 + v2 * (C1 * v2 + C2)) + C2)
        * (v5 + v2 * (C1 * v2 + C2))
      , rand = null;
    this.a = v5 + v6 * (C1 * v6 + C2);
    rand = new MT();
    this.pNoise1 = new PerlinNoise(rand, this.noiseLevel,);
    this.f = 1 / 6 / (0.1 / (this.noiseLevel + 1) + 0.1);
  }
}

class BiomeClimateSelectorOperationNode {

}

exports.MixerOperationNode = MixerOperationNode;
exports.NormalNoiseOperationNode = NormalNoiseOperationNode;
exports.BiomeClimateSelectorOperationNode = BiomeClimateSelectorOperationNode;