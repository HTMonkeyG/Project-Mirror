const { RandomSource } = require("../../Utils/RandomSource.js")
  , Long = require("../../Utils/Long.js");

/**
 * Only calculates first 4 numbers in order to reduce cost
 */
class SimplifiedMT_ extends RandomSource {
  constructor(a) {
    super(a);
    null == a && (a = (new Date).getTime());
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 2567483615;
    this.UPPER_MASK = 2147483648;
    this.LOWER_MASK = 2147483647;
    this.MAXALLOW = 48;
    this.N_ = this.M + this.MAXALLOW + 1;
    this.mt = new Int32Array(this.N_);
    this.mti = this.N + 1;
    this.init_seed(a)
  }

  init_seed(a) {
    this.seed = a;
    var b = this.mt[0] = a >>> 0;
    for (var c = 1; c < this.N_; c++) {
      a = b ^ b >>> 30;
      b = (1812433253 * ((4294901760 & a) >>> 16) << 16) + 1812433253 * (65535 & a) + c;
      /*
        I don't know why, but if remove this statement,
        this program will double it's running time for the
        same parameter.
       */
      b >>>= 0;
      if (c < this.MAXALLOW + 1 || c > this.M - 1)
        this.mt[c] = b
    }
    this.mti = this.N;
  }

  random_int() {
    var a, b = Int32Array.from([0, this.MATRIX_A]);
    if (this.mti >= this.N) {
      for (var c = 0; c < this.MAXALLOW; c++) {
        a = this.mt[c] & this.UPPER_MASK | this.mt[c + 1] & this.LOWER_MASK;
        this.mt[c] = this.mt[c + this.M] ^ a >>> 1 ^ b[1 & a];
      }
      this.mti = 0
    }
    a = this.mt[this.mti++];
    a ^= a >>> 11;
    a ^= a << 7 & 2636928640;
    a ^= a << 15 & 4022730752;

    return (a ^= a >>> 18) >>> 0
  }

  setSeed(a) {
    this.init_seed("number" == typeof a ? a : a.toInt())
  }

  nextInt(a) {
    /*var b = this.random_int();
    b = b < 0 ? !b + 1 : b;
    return b % a*/
    var b;
    return null == a ? this.random_int() >>> 1 : (b = this.random_int(),
      Long.fromInt(b).and(Long.fromNumber(4294967295)).toNumber() % a);
  }
}

class SimplifiedMT extends RandomSource {
  constructor(seed) {
    super(seed);
    this.N = 624;
    this.M = 397;
    this.M_ = 398;
    this.MAXALLOW = 48;
    this.MATRIX_A = 2567483615;
    this.UPPER_MASK = 2147483648;
    this.LOWER_MASK = 2147483647;
    this.mt = new Int32Array(this.N);
    this.setSeed(seed);
  }

  init_seed(a) {
    /*
    this.seed = seed;
    this.mt[0] = seed >>> 0;
    var a;
    for (var v3 = 397, v2 = 1; v3 > 0; v3--, v2++) {
      a = seed ^ (seed >>> 30);
      seed = v2 + (1812433253 * ((4294901760 & a) >>> 16) << 16) + 1812433253 * (65535 & a);
      seed >>>= 0;
      if (v2 < this.MAXALLOW + 1 || v2 > this.M - 1)
        this.mt[v2] = seed;
    }*/
    this.seed = a;
    var b = this.mt[0] = a >>> 0;
    for (var c = 1; c < this.M + 1; c++) {
      a = b ^ b >>> 30;
      b = (1812433253 * ((4294901760 & a) >>> 16) << 16) + 1812433253 * (65535 & a) + c;
      /*
        I don't know why, but if remove this statement,
        this program will double it's running time for the
        same parameter.
       */
      b >>>= 0;
      if (c < this.MAXALLOW + 1 || c > this.M - 1)
        this.mt[c] = b
    }
    this.mti = this.N;
    this.M_ = this.M + 1;
  }

  setSeed(a) {
    this.init_seed("number" == typeof a ? a : a.toInt())
  }

  random_int() {
    var v1, v3, v4, v5
      , MATRIX_A = Int32Array.from([0, this.MATRIX_A]);

    v1 = this.mti;
    if (v1 < 625) {
      if (v1 == 624) {
        v1 = 0;
        this.mti = 0;
      } else if (v1 >= 227) {
        if (v1 > 624)
          this.mt[623] = ((this.mt[623] ^ (this.mt[623] ^ this.mt[0]) & 0x7FFFFFFF) >>> 1) ^ this.mt[396] ^ MATRIX_A[this.mt[0] & 1];
        else
          this.mt[this.mti] = ((this.mt[v1] ^ (this.mt[v1] ^ this.mt[v1 + 1]) & 0x7FFFFFFF) >>> 1) ^ this.mt[this.mti - 227] ^ MATRIX_A[this.mt[v1 + 1] & 1];
      }
      if (v1 < 227) {
        this.mt[v1] = ((this.mt[v1] ^ (this.mt[v1] ^ this.mt[v1 + 1]) & 0x7FFFFFFF) >>> 1) ^ this.mt[v1 + 397] ^ MATRIX_A[this.mt[v1 + 1] & 1];
        v3 = this.M_;
        if (v3 < 624) {
          v4 = this.mt[v3 - 1] ^ this.mt[v3 - 1] >>> 30;
          this.mt[v3] = v3 + (1812433253 * ((4294901760 & v4) >>> 16) << 16) + 1812433253 * (65535 & v4);
          ++this.M_;
        }
      }
    }
    v5 = this.mt[this.mti++];
    v5 ^= v5 >>> 11;
    v5 ^= (v5 & 0xFF3A58AD) << 7;
    v5 ^= (v5 & 0xFFFFDF8C) << 15;
    return (v5 ^= v5 >>> 18) >>> 0;
  }

  nextInt(a) {
    /*var b = this.random_int();
    b = b < 0 ? !b + 1 : b;
    return b % a*/
    var b;
    return null == a ? this.random_int() >>> 1 : (b = this.random_int(),
      Long.fromInt(b).and(Long.fromNumber(4294967295)).toNumber() % a);
  }
}

module.exports.SimplifiedMT = SimplifiedMT;
module.exports.SimplifiedMT_ = SimplifiedMT_;