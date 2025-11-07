/** Random number generators. */

/** Template class for RNGs. */
export declare class RandomSource {
  /** 
   * @param a - Seed.
   */
  constructor(a: number);
  /** RNG seed. */
  seed: number;
  /**
   * Init RNG with given seed
   * @param a - Seed
   */
  setSeed(a: number): void;
  /**
   * Returns a double number between 0 to 1
   */
  random(): number;
  /**
   * Returns an int number between 0 to a
   * @param a - Max value (exclusive)
   */
  nextInt(a: number): number;
  nextIntRaw(): number;
  /**
   * Returns an int number between a to b
   * @param a - Min value (inclusive)
   * @param b - Max value (exclusive)
   */
  nextIntRange(a: number, b: number): number;
  /**
   * Returns a float number between 0 to 1
   */
  nextFloat(): number;
  /**
   * Returns a double number between 0 to 1
   */
  nextDouble(): number;
  /**
   * Returns a boolean
   */
  nextBoolean(): boolean;
}

/** MT-19937 RNG. */
export declare class MT extends RandomSource {
  /**
   * Create RNG from chunk pos.
   * @param levelSeedLow 
   * @param chunkPos 
   */
  static fromChunk(levelSeedLow: number, chunkPos: { x: number, z: number }): MT;
  /** 
   * @param a - Seed.
   */
  constructor(a: number);
  init_seed(a: number): void;
  init_by_array(a: number[], b: number): void;
  random_int(): number;
  random_int31(): number;
  random_incl(): number;
  random(): number;
  random_excl(): number;
  random_long(): number;
  setSeed(a: number): void;
  nextInt(a: number): number;
  nextIntRaw(): number;
  nextIntRange(a: number, b: number): number;
  nextFloat(): number;
  nextDouble(): number;
  nextBoolean(): boolean;
}

/** Xoroshiro128++ RNG with bigint. */
export declare class Xoroshiro128PlusPlus extends RandomSource {
  /**
   * @param a - Seed.
   */
  constructor(a: BigInt | number);
  nextLongBigInt(): BigInt;
  nextLong(): Long;
  nextBoolean(): boolean;
  nextFloat(): number;
  nextInt(a: number): number;
}