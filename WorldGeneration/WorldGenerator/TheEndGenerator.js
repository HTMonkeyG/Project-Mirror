const Mth = require("../../Utils/MathEx.js")
  , { PerlinNoise, SimplexNoise, NoiseCellInterpolator } = require("../../Utils/Noises.js")
  , { MT } = require("../../Utils/RandomSource.js")
  , { ChunkBlockPos, BlockPos, Vec3, ChunkPos } = require("../../Utils/Structs.js")
  , WorldGenerator = require("./WorldGenerator.js")
  , BlockVolume = require("../../ChunkStorage/BlockVolume.js");

class TheEndGenerator extends WorldGenerator {
  /**
   * @param {ChunkPos} chunkPos 
   * @returns 
   */
  static isOutsideCentralIslandArea(chunkPos) {
    return chunkPos.x ** 2 + chunkPos.z ** 2 < 4096
  }

  constructor(dimension, levelSeedLow, biome) {
    super(dimension, levelSeedLow, biome);
    var randomSource = new MT(levelSeedLow);
    this.pNoise1 = new PerlinNoise(randomSource, 16, { a1: true, a2: true, b: true, c: 0 });
    this.pNoise2 = new PerlinNoise(randomSource, 16, { a1: true, a2: true, b: true, c: 0 });
    this.pNoise3 = new PerlinNoise(randomSource, 8, { a1: true, a2: true, b: true, c: 0 });
    this.sNoise1 = new SimplexNoise(randomSource);
  }

  /**
   * Get preliminary height value.
   * @param {Number} x 
   * @param {Number} z 
   * @param {Number} xC 
   * @param {Number} zC 
   * @returns {Number}
   */
  getIslandHeightValue(x, z, xC, zC) {
    // Central island generation
    var v9 = 100.0 - Math.sqrt((zC + 2 * z) ** 2 + (xC + 2 * x) ** 2) * 8.0;
    v9 = Mth.clamp(v9, -100, 80);

    for (var v25 = 25, v11 = x - 12, v28 = xC + 24; v25; v25--, v11++, v28 -= 2) {
      for (var v18 = 25, v16 = z - 12, v17 = zC + 24; v18; v18--, v16++, v17 -= 2) {
        // Outer islands generation
        if (v11 * v11 + v16 * v16 > 4096) {
          if (this.sNoise1.getValue(v11, v16) < -0.89999998) {
            var v20 = 100.0 - (Math.hypot(v17, v28) * ((147 * Math.abs(v16) + 3439 * Math.abs(v11)) % 13 + 9));
            v20 = Mth.clamp(v20, -100, 80);
            v9 = Math.max(v20, v9);
          }
        }
      }
    }

    return v9
  }

  /**
   * Get preliminary height value in integer.
   * @param {Number} x - Block pos X
   * @param {Number} z - Block pos Z
   * @returns {Number}
   */
  getPreliminarySurfaceLevel(x, z) {
    return Math.floor(this.getIslandHeightValue(x >> 4, z >> 4, 1, 1))
  }

  generateDensityCellsForChunk(chunkPos) {
    var result = new Float32Array(3 * 33 * 3)
      , origin = { x: chunkPos.x * 2, y: 0, z: chunkPos.z * 2 }
      , n1 = this.pNoise1.getRegion3D(origin, 3, 33, 3, { x: 1368.824, y: 684.41199, z: 1368.824 })
      , n2 = this.pNoise2.getRegion3D(origin, 3, 33, 3, { x: 1368.824, y: 684.41199, z: 1368.824 })
      , n3 = this.pNoise3.getRegion3D(origin, 3, 33, 3, { x: 17.1103, y: 4.277575, z: 17.1103 });

    for (var xC = 0; xC < 3; xC++) {
      for (var zC = 0; zC < 3; zC++) {
        var hV = this.getIslandHeightValue(chunkPos.x, chunkPos.z, xC, zC);
        for (var yC = 0, v23 = 7; yC < 33; yC += 3, v23 -= 3) {
          var ind = yC + 33 * (zC + 3 * xC)
            , v1 = new Vec3(n3[ind] / 20 + 0.5, n1[ind] / 512, n2[ind] / 512)
            , v2 = new Vec3(n3[ind + 1] / 20 + 0.5, n1[ind + 1] / 512, n2[ind + 1] / 512)
            , v3 = new Vec3(n3[ind + 2] / 20 + 0.5, n1[ind + 2] / 512, n2[ind + 2] / 512)
            , v4 = (new Vec3(
              Mth.clampedLerp(v1.x, v1.y, v1.z),
              Mth.clampedLerp(v2.x, v2.y, v2.z),
              Mth.clampedLerp(v3.x, v3.y, v3.z)
            )).add(hV - 8)
            , v5, v6;

          if (yC < 14) {
            // Middle of the island
            v6 = v4;
            if (yC < 9) {
              // Bottom of the island
              v5 = (new Vec3(v23 + 1, v23, v23 - 1)).scale(0.14285715);
              v6 = (new Vec3(1)).sub(v5).mul(v4).sub(v5.scale(30));
            }
          } else {
            // Top of the island
            v5 = (new Vec3(yC - 14, yC - 13, yC - 12)).scale(0.015625).clamp(0, 1);
            v6 = (new Vec3(1)).sub(v5).mul(v4).sub(v5.scale(3000));
          }

          result[ind] = v6.x;
          result[ind + 1] = v6.y;
          result[ind + 2] = v6.z;
        }
      }
    }

    return result
  }

  prepareHeights(blockVolume, chunkPos) {
    var densityCell = this.generateDensityCellsForChunk(chunkPos)
      , interpolator = new NoiseCellInterpolator(densityCell, 297, 8, 4);

    for (var xCH = 0; xCH < 2; xCH++) {
      for (var zCH = 0; zCH < 2; zCH++) {
        for (var yCH = 0, v23 = 33 * (zCH + 3 * xCH); yCH < 32; yCH++, v23++) {
          interpolator.selectCellXZ(v23, v23 + 33, v23 + 99, v23 + 132);
          for (var zCL = 0; zCL < 8; zCL++) {
            var zP = 8 * zCH + zCL;
            interpolator.updateForZ(zCL);
            for (var xCL = 0; xCL < 8; xCL++) {
              var xP = 8 * xCH + xCL;
              interpolator.updateForX(xCL);
              for (var yCL = 0; yCL < 4; yCL++) {
                var pos = new ChunkBlockPos(xP, yCH * 4 + yCL, zP)
                  //v35 = BedrockBlocks::mAir;
                  , blockData = "air";
                interpolator.lerpFor(yCL);
                if (interpolator.getLerpedValue() > 0.0) {
                  //v35 = BlockTypeRegistry:: getDefaultBlockState(& VanillaBlockTypeIds:: EndStone, 1);
                  blockData = "end_stone";
                  var a5 = 0;
                  if (a5) {
                    //v36 = EVP_PKEY_CTX_get_data(v56);
                    //v37 = Dimension:: getMinHeight(v36);
                    v37 = 0;
                    v61 = BlockPos.fromChunkBlockPos(v57, pos, v37);
                    v38 = pos.x + blockVolume.xL * pos.z;
                    /*v39 = * (* a5 + v38);
                    if (v39 < (LOWORD(v61.y) + 1))
                      v39 = LOWORD(v61.y) + 1;
                      * (* a5 + v38) = v39;*/
                  }
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

  loadChunk(chunkPos) {
    var result = new BlockVolume(16, 256, 16, 'air');
    this.prepareHeights(result, chunkPos);
    return result
  }

  postProcess(chunkPos, chunk) {
    var random = new MT(this.seed)
      , a = (random.nextInt() & 0xFFFFFFFE) + 1
      , b = (random.nextInt() & 0xFFFFFFFE) + 1;
    this.postProcessStructureFeatures(new MT(this.seed ^ (a * chunkPos.x + b * chunkPos.z)), chunkPos);
  }
}

module.exports = TheEndGenerator;