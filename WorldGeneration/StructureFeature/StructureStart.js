const { AABB, ChunkPos, Vec3 } = require("project-mirror-utils");

class StructureStart {
  constructor(chunkPos) {
    this.boundingBox = new AABB();
    this.chunkPos = ChunkPos.copy(chunkPos);
    this.pieces = [];
  }

  calculateBoundingBox() {
    this.boundingBox = new AABB(
      0x7FFFFFFF, 0x7FFFFFFF, 0x7FFFFFFF,
      0x80000000, 0x80000000, 0x80000000
    );
    for (var piece of this.pieces) {
      this.boundingBox.p1.x = Math.min(this.boundingBox.p1.x, piece.boundingBox.p1.x);
      this.boundingBox.p1.y = Math.min(this.boundingBox.p1.y, piece.boundingBox.p1.y);
      this.boundingBox.p1.z = Math.min(this.boundingBox.p1.z, piece.boundingBox.p1.z);

      this.boundingBox.p2.x = Math.max(this.boundingBox.p2.x, piece.boundingBox.p2.x);
      this.boundingBox.p2.y = Math.max(this.boundingBox.p2.y, piece.boundingBox.p2.y);
      this.boundingBox.p2.z = Math.max(this.boundingBox.p2.z, piece.boundingBox.p2.z);
    }
  }

  postProcess() {

  }
}

module.exports = { StructureStart };
