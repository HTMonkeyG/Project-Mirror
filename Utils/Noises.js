const Mth = require("./MathEx.js");
const { RandomSource } = require("./RandomSource");
const { Vec2, Vec3 } = require("./Structs.js");

class NoiseCellInterpolator {
  /**
   * @param {Float32Array} cells 
   * @param {Number} maxIndex 
   * @param {Number} d2 - Distance between each cell in X or Z
   * @param {Number} d3 - Distance between each cell in Y
   */
  constructor(cells, maxIndex, d2, d3) {
    this.cells = Float32Array.from(cells);
    this.a1 = new Float32Array(15);
    this.maxIndex = maxIndex;
    this.xzL = 1 / d2;
    this.yL = 1 / d3;
  }

  selectCellXZ(a2, a3, a4, a5) {
    var v5 = this.maxIndex;
    if (a2 >= v5 || a4 >= v5 || a3 >= v5 || a5 >= v5
      || a2 + 1 >= v5 || a4 + 1 >= v5 || a3 + 1 >= v5 || a5 + 1 >= v5)
      throw new Error();

    this.a1[0] = this.cells[a2];
    this.a1[1] = this.cells[a4];
    this.a1[2] = this.cells[a3];
    this.a1[3] = this.cells[a5];
    this.a1[4] = this.cells[a2 + 1];
    this.a1[5] = this.cells[a4 + 1];
    this.a1[6] = this.cells[a3 + 1];
    this.a1[7] = this.cells[a5 + 1];
  }

  updateForZ(a2) {
    var v4 = a2 * this.xzL;

    this.a1[8] = Mth.lerp(v4, this.a1[0], this.a1[2]);
    this.a1[9] = Mth.lerp(v4, this.a1[1], this.a1[3]);
    this.a1[10] = Mth.lerp(v4, this.a1[4], this.a1[6]);
    this.a1[11] = Mth.lerp(v4, this.a1[5], this.a1[7]);
  }

  updateForX(a2) {
    var v3 = a2 * this.xzL;
    this.a1[12] = Mth.lerp(v3, this.a1[8], this.a1[9]);
    this.a1[13] = Mth.lerp(v3, this.a1[10], this.a1[11]);
  }

  lerpFor(d) {
    this.a1[14] = Mth.lerp(d * this.yL, this.a1[12], this.a1[13]);
  }

  getLerpedValue() {
    return this.a1[14];
  }
}

class ImprovedNoise {
  static SHIFT_UP_EPSILON = 1.0E-7;
  static GRADIENT = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1], [1, 1, 0], [0, -1, 1], [-1, 1, 0], [0, -1, -1]];

  static gradDot(n, d, d2, d3) { return ImprovedNoise.GRADIENT[n & 0xF][0] * d + ImprovedNoise.GRADIENT[n & 0xF][1] * d2 + ImprovedNoise.GRADIENT[n & 0xF][2] * d3 }

  /**
   * @param {RandomSource} randomSource 
   * @param {*} opt 
   */
  constructor(randomSource, opt) {
    this.xo = randomSource.nextDouble() * 256.0;
    this.yo = randomSource.nextDouble() * 256.0;
    this.zo = randomSource.nextDouble() * 256.0;
    this.p = new Uint8Array(256);
    for (var n = 0; n < 256; ++n)
      this.p[n] = n;
    for (var n = 0; n < 256; ++n) {
      var n2 = randomSource.nextInt(256 - n)
        , by = this.p[n];
      this.p[n] = this.p[n + n2];
      this.p[n + n2] = by;
    }

    if (opt) {
      this.a1 = opt.a1;
      this.a2 = opt.a2;
      this.b = opt.b;
      this.c = opt.c;
    } else {
      this.a1 = this.a2 = this.b = this.c = false;
    }
  }

  pf(n) { return this.p[n & 0xFF] & 0xFF }

  sampleAndLerp(n, n2, n3, d, d2, d3, d4) {
    var n4 = this.pf(n),
      n5 = this.pf(n + 1),
      n6 = this.pf(n4 + n2),
      n7 = this.pf(n4 + n2 + 1),
      n8 = this.pf(n5 + n2),
      n9 = this.pf(n5 + n2 + 1),
      d5 = ImprovedNoise.gradDot(this.pf(n6 + n3), d, d2, d3),
      d6 = ImprovedNoise.gradDot(this.pf(n8 + n3), d - 1.0, d2, d3),
      d7 = ImprovedNoise.gradDot(this.pf(n7 + n3), d, d2 - 1.0, d3),
      d8 = ImprovedNoise.gradDot(this.pf(n9 + n3), d - 1.0, d2 - 1.0, d3),
      d9 = ImprovedNoise.gradDot(this.pf(n6 + n3 + 1), d, d2, d3 - 1.0),
      d10 = ImprovedNoise.gradDot(this.pf(n8 + n3 + 1), d - 1.0, d2, d3 - 1.0),
      d11 = ImprovedNoise.gradDot(this.pf(n7 + n3 + 1), d, d2 - 1.0, d3 - 1.0),
      d12 = ImprovedNoise.gradDot(this.pf(n9 + n3 + 1), d - 1.0, d2 - 1.0, d3 - 1.0),
      d13 = Mth.smoothstep(d),
      d14 = Mth.smoothstep(d4),
      d15 = Mth.smoothstep(d3);
    return Mth.lerp3(d13, d14, d15, d5, d6, d7, d8, d9, d10, d11, d12);
  }

  noise(d, d2, d3) {
    var n = Math.floor(d + this.xo)
      , n2 = Math.floor(d2 + this.yo)
      , n3 = Math.floor(d3 + this.zo)
      // Get the fractional part
      , d10 = d + this.xo - n
      , d11 = d2 + this.yo - n2
      , d12 = d3 + this.zo - n3;

    return this.sampleAndLerp(
      n, n2, n3,    // Integer part
      d10, d11, d12 // Fractional part
    );
  }

  _readArea(result, origin, xL, yL, zL, scale, amp) {
    var d9, t1 = this.c * scale.y + this.yo, t2 = -1, i = 0, prev = [];

    for (var xC = 0; xC < xL; xC++) {
      var d = (origin.x + xC) * scale.x
        , n = Math.floor(d + this.xo)
        , d10 = d + this.xo - n;

      for (var zC = 0; zC < zL; zC++) {
        var d3 = (origin.z + zC) * scale.z
          , n3 = Math.floor(d3 + this.zo)
          , d12 = d3 + this.zo - n3;

        for (var yC = 0; yC < yL; yC++) {
          var d2 = (origin.y + yC) * scale.y
            , n2 = Math.floor(d2 + this.yo)
            // Get the fractional part
            , d11 = d2 + this.yo - n2
            , d13 = d11;

          if (!this.a1)
            ;
          else if (this.a2 && Math.trunc(d2 + this.yo) == Math.trunc(t1))
            d11 = t1 - Math.trunc(t1), t2 = n2;
          else if (n2 != t2)
            d11 = d11 - Math.floor(d11 / scale.y) * scale.y, t2 = n2;
          else
            [n, n2, n3, d10, d11, d12] = prev;

          d9 = this.sampleAndLerp(
            n, n2, n3,     // Integer part
            d10, d11, d12, // Fractional part
            d13
          );

          prev = [n, n2, n3, d10, d11, d12];
          result[i] += d9 / amp;
          i++;
        }
      }
    }
  }
}

class PerlinNoise {
  static wrap(d) {
    return d - Math.floor(d / 3.3554432E7 + 0.5) * 3.3554432E7;
  }

  constructor(randomSource, n, opt) {
    this.n = n;
    this.noiseLevels = [];
    for (var i = 0; i < n; i++)
      this.noiseLevels.push(new ImprovedNoise(randomSource, opt));
    this.k = (2 ** n) - 1;
  }

  getValue(d, d2, d3) {
    var d6 = 0.0
      , d7 = 1
    for (var improvedNoise of this.noiseLevels) {
      if (improvedNoise != null) {
        //var d9 = improvedNoise.noise(PerlinNoise.wrap(d * d7), bl ? -improvedNoise.yo : PerlinNoise.wrap(d2 * d7), PerlinNoise.wrap(d3 * d7)/*, d4 * d7, d5 * d7*/);
        var d9 = improvedNoise.noise(d * d7, d2 * d7, d3 * d7);
        d6 += d9 / d7;
      }
      d7 /= 2.0;
    }
    return d6;
  }

  /**
   * Get a 2D area
   * @param {Vec2} origin 
   * @param {Number} xL 
   * @param {Number} zL 
   * @param {Vec2} scale 
   * @returns 
   */
  getRegion2D(origin, xL, zL, scale) {
    var result = new Float32Array(xL * zL), d7 = 1;

    for (var improvedNoise of this.noiseLevels) {
      var i = 0;
      if (improvedNoise) {
        for (var xC = 0; xC < xL; xC++)
          for (var zC = 0; zC < zL; zC++) {
            var d9 = improvedNoise.noise(
              PerlinNoise.wrap((origin.x + xC) * d7 * scale.x),
              PerlinNoise.wrap(10 * d7),
              PerlinNoise.wrap((origin.y + zC) * d7 * scale.y)
            );
            result[i] += d9 / d7;
            i++;
          }
      }
      d7 /= 2.0;
    }

    return result;
  }

  /**
   * Get a 3D area
   * @param {Vec3} origin 
   * @param {Number} xL 
   * @param {Number} zL 
   * @param {Vec3} scale 
   * @returns 
   */
  getRegion3D(origin, xL, yL, zL, scale) {
    var result = new Float32Array(xL * yL * zL), d7 = 1;

    for (var improvedNoise of this.noiseLevels) {
      if (improvedNoise) {
        improvedNoise._readArea(result, origin, xL, yL, zL,
          {
            x: scale.x * d7,
            y: scale.y * d7,
            z: scale.z * d7
          }
          , d7
        )
      }
      d7 /= 2.0;
    }

    return result;
  }
}

class SimplexNoise {
  static SQRT_3 = Math.sqrt(3.0);
  static F2 = 0.5 * (SimplexNoise.SQRT_3 - 1.0);
  static G2 = (3.0 - SimplexNoise.SQRT_3) / 6.0;

  constructor(randomSource) {
    this.p = [];
    this.xo = randomSource.nextDouble() * 256.0;
    this.yo = randomSource.nextDouble() * 256.0;
    this.zo = randomSource.nextDouble() * 256.0;
    for (var n = 0; n < 256; ++n)
      this.p[n] = n;
    for (var n = 0; n < 256; ++n) {
      var n2 = randomSource.nextInt(256 - n)
        , n3 = this.p[n];
      this.p[n] = this.p[n2 + n];
      this.p[n2 + n] = n3;
    }
  }

  pf(n) { return this.p[n & 0xFF] }

  getCornerNoise3D(n, d, d2, d3, d4) {
    var d5
      , d6 = d4 - d * d - d2 * d2 - d3 * d3;
    if (d6 < 0.0) {
      d5 = 0.0;
    } else {
      d6 *= d6;
      d5 = d6 * d6 * ImprovedNoise.gradDot(n, d, d2, d3);
    }
    return d5;
  }

  getValue(d, d2) {
    var d3, n, n2, d4, d5, n3
      , d6 = (d + d2) * SimplexNoise.F2
      , n4 = Mth.floor(d + d6)
      , d7 = n4 - (d4 = (n4 + (n2 = Mth.floor(d2 + d6))) * SimplexNoise.G2)
      , d8 = d - d7;
    if (d8 > (d5 = d2 - (d3 = n2 - d4))) {
      n3 = 1;
      n = 0;
    } else {
      n3 = 0;
      n = 1;
    }
    var d9 = d8 - n3 + SimplexNoise.G2
      , d10 = d5 - n + SimplexNoise.G2
      , d11 = d8 - 1.0 + 2.0 * SimplexNoise.G2
      , d12 = d5 - 1.0 + 2.0 * SimplexNoise.G2
      , n5 = n4 & 0xFF
      , n6 = n2 & 0xFF
      , n7 = this.pf(n5 + this.pf(n6)) % 12
      , n8 = this.pf(n5 + n3 + this.pf(n6 + n)) % 12
      , n9 = this.pf(n5 + 1 + this.pf(n6 + 1)) % 12
      , d13 = this.getCornerNoise3D(n7, d8, d5, 0.0, 0.5)
      , d14 = this.getCornerNoise3D(n8, d9, d10, 0.0, 0.5)
      , d15 = this.getCornerNoise3D(n9, d11, d12, 0.0, 0.5);
    return 70.0 * (d13 + d14 + d15);
  }
}

exports.ImprovedNoise = ImprovedNoise;
exports.PerlinNoise = PerlinNoise;
exports.SimplexNoise = SimplexNoise;
exports.NoiseCellInterpolator = NoiseCellInterpolator;