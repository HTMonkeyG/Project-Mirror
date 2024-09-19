const Mth = require("./MathEx.js")

class ChunkPos {
  constructor(x, z) {
    this.x = x;
    this.z = z
  }
}

class ChunkBlockPos {
  constructor(x, y, z) {
    this.x = x & 0xF;
    this.y = y | 0;
    this.z = z & 0xF;
  }

  toPos() {
    return new BlockPos(this.x, this.y, this.z)
  }
}

class BlockPos {
  static fromChunkBlockPos(chunkPos, chunkBlockPos, yBias) {
    return new BlockPos(
      chunkBlockPos.x + 16 * chunkPos.x,
      yBias + chunkBlockPos.y,
      chunkBlockPos.z + 16 * chunkPos.z
    )
  }

  constructor(x, y, z) {
    this.x = x | 0;
    this.y = y | 0;
    this.z = z | 0;
  }
}

class Vec3 {
  static ZERO = new Vec3(0.0, 0.0, 0.0);

  static fromRGB24(n) {
    var d = (double)(n >> 16 & 0xFF) / 255.0
      , d2 = (double)(n >> 8 & 0xFF) / 255.0
      , d3 = (double)(n & 0xFF) / 255.0;
    return new Vec3(d, d2, d3);
  }

  static atLowerCornerOf(vec3i) {
    return new Vec3(vec3i.getX(), vec3i.getY(), vec3i.getZ());
  }

  static atLowerCornerWithOffset(vec3i, d, d2, d3) {
    return new Vec3(vec3i.getX() + d, vec3i.getY() + d2, vec3i.getZ() + d3);
  }

  static atCenterOf(vec3i) {
    return Vec3.atLowerCornerWithOffset(vec3i, 0.5, 0.5, 0.5);
  }

  static atBottomCenterOf(vec3i) {
    return Vec3.atLowerCornerWithOffset(vec3i, 0.5, 0.0, 0.5);
  }

  static upFromBottomCenterOf(vec3i, d) {
    return Vec3.atLowerCornerWithOffset(vec3i, 0.5, d, 0.5);
  }

  constructor(d, d2, d3) {
    if (typeof d == "number" && typeof d2 == "number" && typeof d3 == "number") {
      this.x = d;
      this.y = d2;
      this.z = d3;
    } else if (typeof d == "number")
      this.x = this.y = this.z = d;
    else
      this.x = this.y = this.z = 0
    return this
  }

  vectorTo(vec3) {
    return new Vec3(vec3.x - this.x, vec3.y - this.y, vec3.z - this.z);
  }

  normalize() {
    var d = Mth.hypot(this.x, this.y, this.z);
    if (d < 1.0E-4) {
      return ZERO;
    }
    return new Vec3(this.x / d, this.y / d, this.z / d);
  }

  dot(vec3) {
    return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
  }

  cross(vec3) {
    return new Vec3(this.y * vec3.z - this.z * vec3.y, this.z * vec3.x - this.x * vec3.z, this.x * vec3.y - this.y * vec3.x);
  }

  /**
   * Vector addition.
   * 
   * Add a constant or a vector.
   * @param {Vec3|Number} a
   * @returns {Vec3}
   */
  add(a) {
    if (typeof a == "object")
      return new Vec3(this.x + a.x, this.y + a.y, this.z + a.z);
    if (typeof a == "number")
      return new Vec3(this.x + a, this.y + a, this.z + a);
    throw new TypeError();
  }

  /**
   * Vector subtraction.
   * 
   * Subtract a constant or a vector.
   * @param {Vec3|Number} a
   * @returns {Vec3}
   */
  sub(a) {
    if (typeof a == "object")
      return new Vec3(this.x - a.x, this.y - a.y, this.z - a.z);
    if (typeof a == "number")
      return new Vec3(this.x - a, this.y - a, this.z - a);
    throw new TypeError();
  }

  clamp(a, b) {
    return new Vec3(
      Mth.clamp(this.x, a, b),
      Mth.clamp(this.y, a, b),
      Mth.clamp(this.z, a, b)
    )
  }

  closerThan(vec3, d) {
    return this.distanceTo(vec3.x, vec3.y, vec3.z) < d;
  }

  distanceTo(vec3) {
    return Mth.hypot(vec3.x - this.x, vec3.y - this.y, vec3.z - this.z);
  }

  distanceToSqr(vec3) {
    return this.distanceTo(vec3) ** 2;
  }

  /**
   * Vector multiplication.
   * @param {Number} d
   * @returns {Vec3}
   */
  scale(d) {
    return new Vec3(this.x * d, this.y * d, this.z * d)
  }

  reverse() {
    return this.scale(-1.0);
  }

  /**
   * Multiply the components separately.
   * @param {Vec3} a
   * @returns {Vec3}
   */
  mul(vec3) {
    return new Vec3(vec3.x * this.x, vec3.y * this.y, vec3.z * this.z);
  }

  offsetRandom(randomSource, f) {
    return this.add((randomSource.nextFloat() - 0.5) * f, (randomSource.nextFloat() - 0.5) * f, (randomSource.nextFloat() - 0.5) * f);
  }

  length() {
    return Math.hypot(this.x, this.y, this.z);
  }

  lengthSqr() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  horizontalDistance() {
    return Math.hypot(this.x, this.z);
  }

  horizontalDistanceSqr() {
    return this.x * this.x + this.z * this.z;
  }

  toString() {
    return "(" + this.x + ", " + this.y + ", " + this.z + ")";
  }

  lerp(vec3, d) {
    return new Vec3(Mth.lerp(d, this.x, vec3.x), Mth.lerp(d, this.y, vec3.y), Mth.lerp(d, this.z, vec3.z));
  }

  xRot(f) {
    var f2 = Mth.cos(f)
      , f3 = Mth.sin(f)
      , d = this.x
      , d2 = this.y * f2 + this.z * f3
      , d3 = this.z * f2 - this.y * f3;
    return new Vec3(d, d2, d3);
  }

  yRot(f) {
    var f2 = Mth.cos(f)
      , f3 = Mth.sin(f)
      , d = this.x * f2 + this.z * f3
      , d2 = this.y
      , d3 = this.z * f2 - this.x * f3;
    return new Vec3(d, d2, d3);
  }

  zRot(f) {
    var f2 = Mth.cos(f)
      , f3 = Mth.sin(f)
      , d = this.x * f2 + this.y * f3
      , d2 = this.y * f2 - this.x * f3
      , d3 = this.z;
    return new Vec3(d, d2, d3);
  }
}

class Vec2 {
  constructor(d, d2) {
    this.x = d;
    this.y = d2;
  }
}

class AABB {

}

exports.ChunkPos = ChunkPos;
exports.BlockPos = BlockPos;
exports.ChunkBlockPos = ChunkBlockPos;
exports.Vec3 = Vec3;
exports.Vec2 = Vec2;