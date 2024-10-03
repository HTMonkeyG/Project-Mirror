const Long = require("./Long.js");

/**
 * Template class for RNGs
 */
class RandomSource {
  /** 
   * @param {*} a - Seed
   */
  constructor(a) { this.seed = a }

  /**
   * Init RNG with given seed
   * @param {*} a - Seed
   */
  setSeed(a) { this.seed = a }

  /**
   * Returns a double number between 0 to 1
   * @returns {Number}
   */
  random() { return 0 }

  /**
   * Returns an int number between 0 to a
   * @param {Number|undefined} a - Max value (exclusive)
   * @returns {Number}
   */
  nextInt(a) { return 0 }

  nextIntRaw() { return 0 }

  /**
   * Returns an int number between a to b
   * @param {Number} a - Min value (inclusive)
   * @param {Number} b - Max value (exclusive)
   * @returns {Number}
   */
  nextIntRange(a, b) { return a }

  /**
   * Returns a float number between 0 to 1
   * @returns {Number}
   */
  nextFloat() { return 0 }

  /**
   * Returns a double number between 0 to 1
   * @returns {Number}
   */
  nextDouble() { return 0 }

  /**
   * Returns a boolean
   * @returns {Number}
   */
  nextBoolean() { return false }
}

/** MT-19937 RNG */
class MT extends RandomSource {
  static fromChunk(levelSeedLow, chunkPos) {
    var c = new MT(levelSeedLow)
      , d = c.nextInt() | 1
      , e = c.nextInt() | 1;
    return c.setSeed((d * chunkPos.x + e * chunkPos.z) ^ levelSeedLow);
  }

  constructor(a) {
    super(a);
    null == a && (a = (new Date).getTime()),
      this.N = 624,
      this.M = 397,
      this.MATRIX_A = 2567483615,
      this.UPPER_MASK = 2147483648,
      this.LOWER_MASK = 2147483647,
      this.mt = new Int32Array(this.N),
      this.mti = this.N + 1,
      a.constructor == Array ? (this.init_by_array(a, a.length), this.seed = null) : (this.init_seed(a), this.seed = a)
  }

  init_seed(a) {
    this.mt[0] = this.seed = a >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++)
      a = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30,
        this.mt[this.mti] = (1812433253 * ((4294901760 & a) >>> 16) << 16) + 1812433253 * (65535 & a) + this.mti,
        this.mt[this.mti] >>>= 0
  }

  init_by_array(a, b) {
    this.seed = null;
    var c, d, e;
    for (this.init_seed(19650218),
      c = 1,
      d = 0,
      e = this.N > b ? this.N : b; e; e--) {
      var f = this.mt[c - 1] ^ this.mt[c - 1] >>> 30;
      this.mt[c] = (this.mt[c] ^ (1664525 * ((4294901760 & f) >>> 16) << 16) + 1664525 * (65535 & f)) + a[d] + d,
        this.mt[c] >>>= 0,
        d++,
        ++c >= this.N && (this.mt[0] = this.mt[this.N - 1],
          c = 1),
        d >= b && (d = 0)
    }
    for (e = this.N - 1; e; e--)
      f = this.mt[c - 1] ^ this.mt[c - 1] >>> 30,
        this.mt[c] = (this.mt[c] ^ (1566083941 * ((4294901760 & f) >>> 16) << 16) + 1566083941 * (65535 & f)) - c,
        this.mt[c] >>>= 0,
        ++c >= this.N && (this.mt[0] = this.mt[this.N - 1],
          c = 1);
    this.mt[0] = 2147483648
  }

  random_int() {
    var a, b = new Array(0, this.MATRIX_A);
    if (this.mti >= this.N) {
      var c;
      for (this.mti == this.N + 1 && this.init_seed(5489),
        c = 0; c < this.N - this.M; c++)
        a = this.mt[c] & this.UPPER_MASK | this.mt[c + 1] & this.LOWER_MASK,
          this.mt[c] = this.mt[c + this.M] ^ a >>> 1 ^ b[1 & a];
      for (; c < this.N - 1; c++)
        a = this.mt[c] & this.UPPER_MASK | this.mt[c + 1] & this.LOWER_MASK,
          this.mt[c] = this.mt[c + (this.M - this.N)] ^ a >>> 1 ^ b[1 & a];
      a = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK,
        this.mt[this.N - 1] = this.mt[this.M - 1] ^ a >>> 1 ^ b[1 & a],
        this.mti = 0
    }
    return a = this.mt[this.mti++],
      a ^= a >>> 11,
      a ^= a << 7 & 2636928640,
      a ^= a << 15 & 4022730752,
      (a ^= a >>> 18) >>> 0
  }

  random_int31() {
    return this.random_int() >>> 1
  }

  random_incl() {
    return this.random_int() * (1 / 4294967295)
  }

  random() {
    return this.random_int() * (1 / 4294967296)
  }

  random_excl() {
    return (this.random_int() + .5) * (1 / 4294967296)
  }

  random_long() {
    return (67108864 * (this.random_int() >>> 5) + (this.random_int() >>> 6)) * (1 / 9007199254740992)
  }

  setSeed(a) {
    this.init_seed("number" == typeof a ? a : a.toInt())
  }

  nextInt(a) {
    var b;
    return null == a ? this.random_int() >>> 1 : (b = this.random_int(),
      Long.fromInt(b).and(Long.fromNumber(4294967295)).toNumber() % a);
  }

  nextIntRaw() {
    return this.random_int()
  }

  nextIntRange(a, b) {
    return b > a ? a + this.nextInt(b - a) : a
  }

  nextFloat() {
    return Math.fround(this.random())
  }

  nextDouble() {
    return this.random()
  }

  nextBoolean() {
    return 0 != (134217728 & this.random_int())
  }
}

/** Xoroshiro128++ RNG with bigint */
class Xoroshiro128PlusPlus extends RandomSource {
  /**
   * @param {BigInt|Number} a - seed
   */
  constructor(a) {
    super(BigInt(a));
    this.seedLo = this.seed & 0xFFFFFFFFFFFFFFFFn;
    this.seedHi = (this.seed & 0xFFFFFFFFFFFFFFFF0000000000000000n) >> 64n;
  }

  nextLongBigInt() {
    function rotateLeft(a, b) { return (b > 0 ? (a << b) | (a >> (64n - b)) : (a << (64n + b)) | (a >> -b)) & 0xFFFFFFFFFFFFFFFFn }
    var l = this.seedLo
      , l2 = this.seedHi
      , l3 = rotateLeft(l + l2, 17n) + l;
    this.seedLo = rotateLeft(l, 49n) ^ (l2 ^= l) ^ l2 << 21n;
    this.seedHi = rotateLeft(l2, 28n);
    return l3 & 0xFFFFFFFFFFFFFFFFn
  }

  nextLong() { return Long.fromString(this.nextLongBigInt().toString()) }
  nextBoolean() { return this.nextLongBigInt() & 1n == 1n }
  nextFloat() { return Number(this.nextLongBigInt() & 0xFFFFFFn) / 0xFFFFFF }
  nextInt(a) {
    var b = this.nextLongBigInt() & 0xFFFFFFFFn;
    return !a ? b : b
  }
}

exports.RandomSource = RandomSource;
exports.MT = MT;
exports.Xoroshiro128PlusPlus = Xoroshiro128PlusPlus;