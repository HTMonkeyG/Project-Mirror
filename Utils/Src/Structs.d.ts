import { RandomSource } from "./RandomSource";

/** Data storage structures. */

/**
 * Object storages chunk pos.
 */
export declare class ChunkPos {
  /**
   * Get chunk pos of given block pos.
   * @param blockPos 
   */
  static fromBlockPos(blockPos: BlockPos): ChunkPos;
  /**
   * Copy a ChunkPos object to a new ChunkPos object.
   * @param chunkPos 
   */
  static copy(chunkPos: ChunkPos): ChunkPos;
  /**
   * @param x
   * @param z 
   */
  constructor(x: number, z: number);
  x: number;
  z: number;
  /**
   * Check whether the ChunkPos is within the given range.
   * @param a2 - Min pos.
   * @param a3 - Max pos.
   * @returns 
   */
  isWithinBounds(a2: ChunkPos, a3: ChunkPos): boolean;
}

/**
 * Object storages a block within a chunk.
 */
export declare class ChunkBlockPos {
  /**
   * @param x
   * @param y
   * @param z 
   */
  constructor(x: number, y: number, z: number);
  x: number;
  y: number;
  z: number;
  /**
   * Copy the pos data directly to a BlockPos.
   */
  toPos(): BlockPos;
}

export declare class BlockPos {
  /**
   * Combine a ChunkPos and a ChunkBlockPos together to calculate the BlockPos
   * @param chunkPos - Coordinate of the chunk .
   * @param chunkBlockPos - Coordinate of the block in the chunk.
   * @param yBias - The min Y value of the chunk.
   */
  static fromChunkBlockPos(chunkPos: ChunkPos, chunkBlockPos: ChunkBlockPos, yBias: number): BlockPos;
  /**
   * Copy a BlockPos object to a new BlockPos object.
   * @param chunkPos 
   */
  static copy(blockPos: BlockPos): BlockPos;
  /**
   * @param x 
   * @param y 
   * @param z 
   */
  constructor(x: number, y: number, z: number);
  x: number;
  y: number;
  z: number;
  /**
   * Move coordinates in the specified direction.
   * @param direction 
   * @param offset 
   */
  relative(direction: number, offset: number): BlockPos;
}

/** 3D vector. */
export declare class Vec3 {
  /** Zero vector. */
  static ZERO: Vec3;
  /**
   * Copy a new Vec3 object.
   * 
   * Also can be used for construct Vec3 from vec3-like objects.
   * @param vec3
   */
  static copy(vec3: Vec3): Vec3;
  /**
   * Unpack rgb values from packed 24 bit integer.
   * @param n 
   */
  static fromRGB24(n: number): Vec3;
  static atLowerCornerOf(vec3i: Vec3): Vec3;
  static atLowerCornerWithOffset(vec3i: Vec3, d: number, d2: number, d3: number): Vec3
  static atCenterOf(vec3i: Vec3): Vec3;
  static atBottomCenterOf(vec3i: Vec3): Vec3;
  static upFromBottomCenterOf(vec3i: Vec3, d: number): Vec3;
  /**
   * @param d - X.
   * @param d2 - Y.
   * @param d3 - Z.
   */
  constructor(d: number, d2: number, d3: number);
  x: number;
  y: number;
  z: number;
  /**
   * Equivalent to sub(vec3).
   * @param vec3 
   */
  vectorTo(vec3: Vec3): Vec3;
  /**
   * Calculate the same direction unit vector.
   */
  normalize(): Vec3;
  /**
   * Vector dot product.
   * @param vec3 
   */
  dot(vec3: Vec3): number;
  /**
   * Vector cross product.
   * @param vec3 
   */
  cross(vec3: Vec3): Vec3;
  /**
   * Vector addition.
   * 
   * Add a number or a vector.
   * @param {} a
   */
  add(a: Vec3 | number): Vec3;
  /**
   * Vector subtraction.
   * 
   * Subtract a number or a vector.
   * @param a
   */
  sub(a: Vec3 | number): Vec3;
  /**
   * Clamp each component of the vector to the given range.
   * @param a - Min.
   * @param b - Max.
   */
  clamp(a: Vec3, b: Vec3): Vec3;
  closerThan(vec3: Vec3, d: number): boolean;
  distanceTo(vec3: Vec3): Vec3;
  distanceToSqr(vec3: Vec3): Vec3;
  /**
   * Vector multiplication.
   * @param d
   */
  scale(d: number): Vec3;
  /**
   * Equivalent to scale(-1).
   */
  reverse(): Vec3;
  /**
   * Multiply the components separately.
   * @param a
   */
  mul(vec3: Vec3): Vec3;
  offsetRandom(randomSource: RandomSource, f: number): number;
  /**
   * Length of the vector.
   */
  length(): number;
  /**
   * Equal to length() ** 2
   */
  lengthSqr(): number;
  /**
   * The length of the vector's projection onto the xOz plane.
   */
  horizontalDistance(): number;
  /**
   * Equal to horizontalDistance() ** 2
   */
  horizontalDistanceSqr(): number;
  /**
   * Perform component-wise linear interpolation between two vectors using a specified ratio.
   * @param vec3 
   * @param d 
   */
  lerp(vec3: Vec3, d: number): Vec3;
  /**
   * Rotate about the X-axis by a specified angle in radians.
   * @param f 
   */
  xRot(f: number): Vec3;
  /**
   * Rotate about the Y-axis by a specified angle in radians.
   * @param f 
   */
  yRot(f: number): Vec3;
  /**
   * Rotate about the Z-axis by a specified angle in radians.
   * @param f 
   */
  zRot(f: number): Vec3;
}

/** 2D vector. */
export declare class Vec2 {
  constructor(d: number, d2: number);
}

/** Axis aligned bounding box. */
export declare class AABB {
  static copy(aabb: AABB): AABB;
  static fromPoints(
    p1: { x: number, y: number, z: number },
    p2: { x: number, y: number, z: number }
  ): AABB;
  constructor(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number);
  getVolume(): number;
  getSize(): number;
  getCenter(): Vec3
  getBounds(): Vec3;
  move(vec3: Vec3): void;
}