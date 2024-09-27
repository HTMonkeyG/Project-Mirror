const { RandomSource } = require("../../Utils/RandomSource.js")
  , Long = require("../../Utils/Long.js");

/**
 * Only calculates first 4 numbers in order to reduce cost
 */
class SimplifiedMT extends RandomSource {
  constructor(a) {
    super(a);
    null == a && (a = (new Date).getTime());
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 2567483615;
    this.UPPER_MASK = 2147483648;
    this.LOWER_MASK = 2147483647;
    this.MAXALLOW = 4;
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

module.exports = SimplifiedMT;