const Mth = require("../../Utils/MathEx.js")
  , { PerlinNoise, NoiseCellInterpolator } = require("../../Utils/Noises.js")
  , { ChunkBlockPos } = require("../../Utils/Structs.js")
  , { MT } = require("../../Utils/RandomSource.js")
  , WorldGenerator = require("./WorldGenerator.js");

class NetherGenerator extends WorldGenerator {
  constructor(dimension, levelSeedLow, biome) {
    super(dimension, levelSeedLow, biome);

    var randomSource = new MT(levelSeedLow);
    this.pNoise1 = new PerlinNoise(randomSource, 16, { a1: true, a2: true, b: true, c: 0 });
    this.pNoise2 = new PerlinNoise(randomSource, 16, { a1: true, a2: true, b: true, c: 0 });
    this.pNoise3 = new PerlinNoise(randomSource, 8, { a1: true, a2: true, b: true, c: 0 });
    this.pNoise4 = new PerlinNoise(randomSource, 4, { a1: true, a2: true, b: true, c: 0 });

    this.pNoise5 = new PerlinNoise(randomSource, 10, { a1: true, a2: true, b: true, c: 0 });
    this.pNoise6 = new PerlinNoise(randomSource, 16, { a1: true, a2: true, b: true, c: 0 });
  }

  generateDensityCellsForChunk(chunkPos) {
    var result = new Float32Array(5 * 17 * 5)
      , origin = { x: chunkPos.x * 4, y: 0, z: chunkPos.z * 4 }
      //, n1 = this.pNoise5.getRegion3D(origin, 5, 1, 5, { x: 1, y: 0, z: 1 })
      //, n2 = this.pNoise6.getRegion3D(origin, 5, 1, 5, { x: 100, y: 0, z: 100 })
      , n5 = this.pNoise3.getRegion3D(origin, 5, 17, 5, { x: 8.55515, y: 34.2206, z: 8.55515 })
      , n3 = this.pNoise1.getRegion3D(origin, 5, 17, 5, { x: 684.41199, y: 2053.2358, z: 684.41199 })
      , n4 = this.pNoise2.getRegion3D(origin, 5, 17, 5, { x: 684.41199, y: 2053.2358, z: 684.41199 })
      , n6 = new Float32Array(17);

    for (var i = 0, v14 = 0; i < 17; i++, v14 = i) {
      n6[i] = Math.cos(i * 1.1087974) * 2.0;
      if (i > 8)
        v14 = 16 - v14;
      if (v14 < 4)
        n6[i] = n6[i] - ((4.0 - v14) ** 3) * 10;
    }

    for (var xC = 0; xC < 5; xC++) {
      for (var zC = 0; zC < 5; zC++) {
        for (var yC = 0, v23 = 0; yC < 17; v23 += 8, yC++) {
          var ind = yC + 17 * (zC + 5 * xC)
            , v1 = n3[ind] / 512
            , v2 = n5[ind] / 20 + 0.5
            , v3 = n4[ind] / 512;
          if (v2 >= 0) {
            if (v2 <= 1)
              v3 = Mth.lerp(v2, v1, v3);
            v1 = v3;
          }
          var v84 = v1 - n6[yC];
          if (yC > 13)
            v84 -= (yC - 13) / 3 * (v84 + 10);
          result[ind] = v84;
        }
      }
    }

    return result
  }

  prepareHeights(blockVolume, chunkPos) {
    var densityCell = this.generateDensityCellsForChunk(chunkPos)
      , interpolator = new NoiseCellInterpolator(densityCell, 425, 4, 8);

    for (var xCH = 0; xCH < 4; xCH++) {
      for (var zCH = 0; zCH < 4; zCH++) {
        for (var yCH = 0, v23 = 17 * (zCH + 5 * xCH); yCH < 16; yCH++, v23++) {
          interpolator.selectCellXZ(v23, v23 + 17, v23 + 85, v23 + 102);
          for (var zCL = 0; zCL < 4; zCL++) {
            var zP = 4 * zCH + zCL;
            interpolator.updateForZ(zCL);
            for (var xCL = 0; xCL < 4; xCL++) {
              var xP = 4 * xCH + xCL;
              interpolator.updateForX(xCL);
              for (var yCL = 0; yCL < 8; yCL++) {
                var yP = yCH * 8 + yCL
                  , pos = new ChunkBlockPos(xP, yP, zP)
                  , blockData = "stone";
                interpolator.lerpFor(yCL);
                if (interpolator.getLerpedValue() <= 0.0) {
                  blockData = "air";
                  if (yP < this.dimension.seaLevel)
                    blockData = "water";
                }
                blockVolume.data[blockVolume.index(pos)] = blockData;
              }
            }
          }
        }
      }
    }

    return blockVolume
  }
}

module.exports = NetherGenerator;