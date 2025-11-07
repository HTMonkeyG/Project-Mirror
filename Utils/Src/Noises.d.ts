import { RandomSource } from "./RandomSource";

/** Noise generators. */

/** 3D cell interpolator. */
export declare class NoiseCellInterpolator {
  /**
   * @param cells - Cells in XZY ordering.
   * @param maxIndex - Must equal to cells.length - 1
   * @param d2 - Distance in blocks between each cell in X or Z.
   * @param d3 - Distance in blocks between each cell in Y.
   */
  constructor(cells: Float32Array, maxIndex: number, d2: number, d3: number);
  /**
   * Select cells with given indices.
   * @param a2
   * @param a3 
   * @param a4 
   * @param a5 
   */
  selectCellXZ(a2: number, a3: number, a4: number, a5: number): void;
  /**
   * Interpolate 4 edges parallel to the Z axis at a given offset (in blocks).
   * @param a2 
   */
  updateForZ(a2: number): void;
  /**
   * Interpolate 2 edges parallel to the X axis at a given offset (in blocks).
   * @param a2 
   */
  updateForX(a2: number): void;
  /**
   * Interpolate final edge parallel to the Y axis at a given offset (in blocks).
   * @param a2 
   */
  lerpFor(d: number): void;
  /**
   * Get the result.
   */
  getLerpedValue(): number;
}

/** Perlin noise. */
export declare class ImprovedNoise {
  static SHIFT_UP_EPSILON: 1.0E-7;
  static GRADIENT: [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1], [1, 1, 0], [0, -1, 1], [-1, 1, 0], [0, -1, -1]];
  static gradDot(n: number, d: number, d2: number, d3: number): number;
  /**
   * @param {RandomSource} randomSource - RNG to initialize the noise.
   * @param {*} opt 
   */
  constructor(randomSource: RandomSource, opt: { a1: boolean, a2: boolean, b: boolean, c: number });
  pf(n: number): number;
  sampleAndLerp(n: number, n2: number, n3: number, d: number, d2: number, d3: number, d4: number): number;
  /**
   * Get the noise value at given pos.
   * @param d - X
   * @param d2 - Y
   * @param d3 - Z
   */
  noise(d: number, d2: number, d3: number): number;
  /**
   * Generate noise values in a specific area.
   * @param origin - Area origin.
   * @param xL - Area side length of X.
   * @param yL - Area side length of Y.
   * @param zL - Area side length of Z.
   * @param scale - Coordinate scaling ratio.
   * @param amp - Result amplifier.
   */
  noiseArea(
    origin: { x: number, y: number, z: number },
    xL: number,
    yL: number,
    zL: number,
    scale: { x: number, y: number, z: number },
    amp: number
  ): Float32Array;
}

/** Fractal perlin noise. */
export declare class PerlinNoise {
  static wrap(d: number): number;
  /**
   * @param randomSource - RNG to initialize the noise.
   * @param n - Fractal noise octave count.
   * @param opt 
   */
  constructor(randomSource: RandomSource, n: number, opt: { a1: boolean, a2: boolean, b: boolean, c: number });
  /**
   * Get the noise value at given pos.
   * @param d - X
   * @param d2 - Y
   * @param d3 - Z
   */
  getValue(d: number, d2: number, d3: number): number;
  /**
   * Get noise values in a 2D area.
   * @param origin - Area origin.
   * @param xL - Area side length of X.
   * @param yL - Area side length of Y.
   * @param scale - Coordinate scaling ratio.
   */
  getRegion2D(
    origin: { x: number, y: number },
    xL: number,
    yL: number,
    scale: { x: number, y: number }
  ): Float32Array;
  /**
   * Get noise values in a 3D area.
   * @param origin - Area origin.
   * @param xL - Area side length of X.
   * @param yL - Area side length of Y.
   * @param zL - Area side length of Z.
   * @param scale - Coordinate scaling ratio.
   */
  getRegion3D(
    origin: { x: number, y: number, z: number },
    xL: number,
    yL: number,
    zL: number,
    scale: { x: number, y: number, z: number }
  ): Float32Array;
}

/** Ken Perlin's simplex noise. */
export declare class SimplexNoise {
  static SQRT_3: number;
  static F2: number;
  static G2: number;
  constructor(randomSource: RandomSource);
  pf(n: number): number;
  getCornerNoise3D(n: number, d: number, d2: number, d3: number, d4: number): number;
  getValue(d: number, d2: number): number;
}