const { PerlinNoise } = require("../../Utils/Noises.js")
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

    var v16 = 0;
    for (var xC = 0; xC < 5; xC++) {
      for (var zC = 0; zC < 5; zC++) {
        for (var v26 = 0, v23 = 0; v23 < 10; v26 += 8, v23 += 8, v16 += 8) {
          var v29 = n3[v16] / 512
            , v30 = n5[v16] / 20 + 0.5
            , v31 = n4[v16] / 512;
          if (v30 >= 0.0) {
            if (v30 <= 1.0)
              v31 = ((v31 - v29) * v30) + v29;
            v29 = v31;
          }
          var v32 = v29 - n6[v26];
          if (v23 > 13)
            v32 = ((1.0 - ((v23 - 13) / 3)) * v32) - (((v23 - 13) / 3) * 10.0);
          if (v23 < 0.0) {
            var v33 = Math.min(Math.max(v23 * -0.25, 0.0), 1.0);
            v32 = ((1.0 - v33) * v32) - (v33 * 10.0);
          }
          result[v16] = v32;

          var v36 = n3[v16 + 1] / 512
            , v37 = n5[v16 + 1] / 20 + 0.5
            , v38 = n4[v16 + 1] / 512;
          if (v37 >= 0.0) {
            if (v37 <= 1.0)
              v38 = ((v38 - v36) * v37) + v36;
            v36 = v38;
          }
          var v39 = v36 - n6[v26 + 1];
          if (v23 + 1 < 0) {
            var v40 = Math.min(Math.max((v23 + 1) * -0.25, 0.0), 1.0);
            v39 = ((1.0 - v40) * v39) - (v40 * 10.0);
          }
          result[v16 + 1] = v39;

          var v43 = n3[v16 + 2] / 512
            , v44 = n5[v16 + 2] / 20 + 0.5
            , v45 = n4[v16 + 2] / 512;
          if (v44 >= 0.0) {
            if (v44 <= 1.0)
              v45 = ((v45 - v43) * v44) + v43;
            v43 = v45;
          }
          var v46 = v43 - n6[v26 + 2];
          var v47 = v23 + 2;
          if (v23 + 2 > 13)
            v46 = ((1.0 - ((v23 - 11) / 2)) * v46) - (((v23 - 11) / 2) * 10.0);
          if (v47 < 0.0) {
            var v48 = Math.min(Math.max(v47 * -0.25, 0.0), 1.0);
            v46 = ((1.0 - v48) * v46) - (v48 * 10.0);
          }
          result[v16 + 2] = v46;

          var v52 = n3[v16 + 3] / 512
            , v53 = n5[v16 + 3] / 20 + 0.5
            , v54 = n4[v16 + 3] / 512;
          if (v53 >= 0.0) {
            if (v53 <= 1.0)
              v54 = ((v54 - v52) * v53) + v52;
            v52 = v54;
          }
          var v55 = v52 - n6[v26 + 3];
          var v56 = v23 + 3;
          if (v23 + 3 > 13)
            v55 = ((1.0 - ((v23 - 10) / 3)) * v55) - (((v23 - 10) / 3) * 10.0);
          if (v56 < 0.0) {
            var v57 = Math.min(Math.max(v56 * -0.25, 0.0), 1.0);
            v55 = ((1.0 - v57) * v55) - (v57 * 10.0);
          }
          result[v16 + 3] = v55;

          var v60 = n3[v16 + 4] / 512
            , v61 = n4[v16 + 4] / 512
            , v62 = n5[v16 + 4] / 20 + 0.5;
          if (v62 >= 0.0) {
            if (v62 <= 1.0)
              v61 = ((v61 - v60) * v62) + v60;
            v60 = v61;
          }
          var v63 = v60 - n6[v26 + 4];
          var v64 = v23 + 4;
          if (v23 + 4 > 13)
            v63 = ((1.0 - ((v23 - 9) * 0.33333334)) * v63) - (((v23 - 9) * 0.33333334) * 10.0);
          if (v64 < 0.0) {
            var v65 = Math.min(Math.max(v64 * -0.25, 0.0), 1.0);
            v63 = ((1.0 - v65) * v63) - (v65 * 10.0);
          }
          result[v16 + 4] = v63;

          var v67 = n3[v16 + 5] / 512
            , v68 = n4[v16 + 5] / 512
            , v69 = n5[v16 + 5] / 20 + 0.5;
          if (v69 >= 0.0) {
            if (v69 <= 1.0)
              v68 = ((v68 - v67) * v69) + v67;
            v67 = v68;
          }
          var v70 = v67 - n6[v26 + 5];
          var v71 = v23 + 5;
          if (v23 + 5 > 13)
            v70 = ((1.0 - ((v23 - 8) * 0.33333334)) * v70) - (((v23 - 8) * 0.33333334) * 10.0);
          if (v71 < 0.0) {
            var v72 = Math.min(Math.max(v71 * -0.25, 0.0), 1.0);
            v70 = ((1.0 - v72) * v70) - (v72 * 10.0);
          }
          result[v16 + 5] = v70;

          var v74 = n3[v16 + 6] / 512
            , v75 = n4[v16 + 6] / 512
            , v76 = n5[v16 + 6] / 20 + 0.5;
          if (v76 >= 0.0) {
            if (v76 <= 1.0)
              v75 = ((v75 - v74) * v76) + v74;
            v74 = v75;
          }
          var v77 = v74 - n6[v26 + 6];
          var v78 = v23 + 6;
          if (v23 + 6 > 13)
            v77 = ((1.0 - ((v23 - 7) * 0.33333334)) * v77) - (((v23 - 7) * 0.33333334) * 10.0);
          if (v78 < 0.0) {
            var v79 = Math.min(Math.max(v78 * -0.25, 0.0), 1.0);
            v77 = ((1.0 - v79) * v77) - (v79 * 10.0);
          }
          result[v16 + 6] = v77;

          var v81 = n3[v16 + 7] / 512
            , v82 = n4[v16 + 7] / 512
            , v83 = n5[v16 + 7] / 20 + 0.5;
          if (v83 >= 0.0) {
            if (v83 <= 1.0)
              v82 = ((v82 - v81) * v83) + v81;
            v81 = v82;
          }
          var v84 = v81 - n6[v26 + 7];
          var v85 = v23 + 7;
          if (v23 + 7 > 13)
            v84 = ((1.0 - ((v23 - 6) * 0.33333334)) * v84) - (((v23 - 6) * 0.33333334) * 10.0);
          if (v85 < 0.0) {
            var v86 = Math.min(Math.max(v85 * -0.25, 0.0), 1.0);
            v84 = ((1.0 - v86) * v84) - (v86 * 10.0);
          }
          result[v16 + 7] = v84;
        }

        var v89 = n3[v16] / 512
          , v90 = n5[v16] / 20 + 0.5
          , v91 = n4[v16] / 512;
        if (v90 >= 0.0) {
          if (v90 <= 1.0)
            v91 = ((v91 - v89) * v90) + v89;
          v89 = v91;
        }
        var v92 = v89 - n6[v26];
        var v88 = v23 - 13;
        if (v23 > 13)
          v92 = ((1.0 - (v88 * 0.33333334)) * v92) - ((v88 * 0.33333334) * 10.0);
        if (v23 < 0.0) {
          var v93 = Math.min(Math.max(v23 * -0.25, 0.0), 1.0);
          v92 = ((1.0 - v93) * v92) - (v93 * 10.0);
        }
        result[v16] = v92;
        v16++;
      }
    }

    return result
  }

  prepareHeights() { }
}

module.exports = NetherGenerator;