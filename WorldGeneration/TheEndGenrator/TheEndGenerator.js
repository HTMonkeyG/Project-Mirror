const Mth = require("../../Utils/MathEx.js");
const { PerlinNoise, SimplexNoise } = require("../../Utils/Noises.js")
  , { MT } = require("../../Utils/RandomSource.js")
  , { cvthex2ps } = require("../../Utils/Converts.js");

class TheEndGenerator {
  constructor(levelSeedLow) {
    var randomSource = new MT(levelSeedLow);
    this.pNoise1 = new PerlinNoise(randomSource, 16, { a1: true, a2: true, b: true, c: 0 });
    this.pNoise2 = new PerlinNoise(randomSource, 16, { a1: true, a2: true, b: true, c: 0 });
    this.pNoise3 = new PerlinNoise(randomSource, 8, { a1: true, a2: true, b: true, c: 0 });
    this.sNoise1 = new SimplexNoise(randomSource);
  }

  getIslandHeightValue(x, z, xC, zC) {
    var v9 = 100.0 - Math.sqrt((zC + 2 * z) ** 2 + (xC + 2 * x) ** 2) * 8.0;
    v9 = v9 <= 80 ? v9 < -100 ? -100 : v9 : 80;

    for (var v25 = 25, v11 = x - 12, v24 = x - 12, v28 = xC + 24; v25; v25--, v11++, v24++, v28 -= 2) {
      for (var v18 = 25, v15 = z - 12, v16 = z - 12, v17 = zC + 24; v18; v18--, v15++, v16++, v17 -= 2) {
        if (v24 * v24 + v16 * v16 > 4096) {
          if (this.sNoise1._getValue(v11, v15) < -0.89999998) {
            var v20 = 100.0 - (Math.hypot(v17, v28) * ((147 * abs(v15) + 3439 * abs(v11)) % 13 + 9));
            if (v20 <= 80.0) {
              if (v20 <= -100.0)
                v20 = -100;
            } else
              v20 = 80;
            v9 = Math.max(v20, v9);
          }
        }
      }
    }

    return v9
  }

  generateDensityCellsForChunk(chunkPos) {
    var result = new Float32Array(3 * 33 * 3)
      , a3a = { x: chunkPos.x * 2, y: 0, z: chunkPos.z * 2 }
      , n1 = this.pNoise1.getRegion3D(a3a, 3, 33, 3, { x: 1368.824, y: 684.41199, z: 1368.824 })
      , n2 = this.pNoise2.getRegion3D(a3a, 3, 33, 3, { x: 1368.824, y: 684.41199, z: 1368.824 })
      , n3 = this.pNoise3.getRegion3D(a3a, 3, 33, 3, { x: 17.1103, y: 4.277575, z: 17.1103 });

    for (var xC = 0; xC < 3; xC++) {
      for (var zC = 0; zC < 3; zC++) {
        var hV = this.getIslandHeightValue(chunkPos.x, chunkPos.z, xC, zC);
        for (var yC = 0, v23 = 7; yC < 33; yC += 3, v23 -= 3) {
          var ind = xC * yC * zC
            , v24 = n1[ind] * 0.001953125
            , v25 = n3[ind] * 0.050000001 + 0.5
            , v26 = n2[ind] * 0.001953125

          if (v25 >= 0) {
            if (v25 <= 1)
              v26 = Mth.lerp(v25, v24, v26);
            v24 = v26;
          }

          var v27 = (v24 - 8.0) + hV, v28, v30, v31, v32;
          if (yC < 14) {
            if (yC <= 8) {
              v32 = (v23 + 1) * 0.14285715;
              v30 = 1 - v32;
              v31 = v32 * 30;
              v27 = (v30 * v27) - v31;
            }
          } else {
            v28 = Mth.clamp((yC - 14) * 0.015625, 0, 1);
            v30 = 1.0 - v28;
            v31 = v28 * 3000;
            v27 = (v30 * v27) - v31;
          }

          result[ind] = v27;

          var v36 = n1[ind + 1] * 0.001953125
            , v37 = (n3[ind + 1] * 0.050000001) + 0.5
            , v38 = n2[ind + 1] * 0.001953125;

          if (v37 >= 0.0) {
            if (v37 <= 1.0)
              v38 = Mth.lerp(v37, v36, v38);
            v36 = v38;
          }

          var v39 = (v36 - 8.0) + hV, v40, v41, v42, v43, v44;
          if (yC < 14) {
            v43 = v39;
            if (yC <= 8) {
              v44 = v23 * 0.14285715;
              v41 = 1.0 - v44;
              v42 = v44 * 30.0;
              v43 = (v41 * v39) - v42;
            }
          } else {
            v40 = Mth.clamp((yC - 13) * 0.015625, 0, 1);
            v41 = 1.0 - v40;
            v42 = v40 * 3000.0;
            v43 = (v41 * v39) - v42;
          }

          result[ind + 1] = v43;
          var v47 = n1[ind + 2] * 0.001953125
            , v48 = (n3[ind + 2] * 0.050000001) + 0.5
            , v49 = n2[ind + 2] * 0.001953125;

          if (v48 >= 0.0) {
            if (v48 <= 1.0)
              v49 = Mth.lerp(v48, v47, v49);
            v47 = v49;
          }

          var v50 = (v47 - 8.0) + hV, v51, v52, v53, v54, v55;
          if (yC < 14) {
            v54 = v50;
            if (yC <= 8) {
              v55 = (v23 - 1) * 0.14285715;
              v52 = 1.0 - v55;
              v53 = v55 * 30.0;
              v54 = (v52 * v50) - v53;
            }
          } else {
            v51 = Mth.clamp((yC - 12) * 0.015625, 0, 1);
            v52 = 1.0 - v51;
            v53 = v51 * 3000.0;
            v54 = (v52 * v50) - v53;
          }

          result[ind + 2] = v54;
        }
      }
    }

    return result
  }

  prepareHeights(blockVolume, chunkPos) {

  }

  loadChunk(blockVolume, chunkPos) {

  }
}

module.exports = TheEndGenerator;