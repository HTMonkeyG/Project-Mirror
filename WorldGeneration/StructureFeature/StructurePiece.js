const {
  AABB
} = require("project-mirror-utils");

class StructurePiece {
  static findCollisionPiece(pieces, boundingBox) {
    var box = boundingBox;
    for (var piece of pieces) {
      var pb = piece.boundingBox;
      if (
        pb.p2.x >= box.p1.x
        && pb.p1.x <= box.p2.x
        && pb.p2.z >= box.p1.z
        && pb.p1.z <= box.p2.z
        && pb.p2.y >= box.p1.y
        && pb.p1.y <= box.p2.y
      )
        return piece;
    }
    return void 0;
  }

  constructor() {
    this.boundingBox = new AABB();
  }
}

module.exports = { StructurePiece };
