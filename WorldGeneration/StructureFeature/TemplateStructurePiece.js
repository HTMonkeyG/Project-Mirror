const {
  AABB,
  Vec3,
  BlockPos,
  RotationUtils
} = require("project-mirror-utils")
const { LegacyStructureSettings } = require("./LegacyStructureSettings.js");
const { StructurePiece } = require("./StructurePiece.js");

class TemplateStructurePiece extends StructurePiece {
  constructor() {
    super();

    this.boundingBox = new AABB(0, 0, 0, 0, 0, 0);
    this.origin = new BlockPos(0);
    this.settings = null;
    this.template = null;
  }

  _setup(template, settings, pos) {
    this.template = template;
    this.settings = LegacyStructureSettings.copy(settings)
    this.origin = BlockPos.copy(pos);
    this.setBoundingBoxFromTemplate();
  }

  setBoundingBoxFromTemplate() {
    var rotation = this.settings.getRotation()
      , size = this.template.getSize(rotation)
      , mirror = this.settings.getMirror();

    this.boundingBox.p1 = new Vec3(0, 0, 0);
    this.boundingBox.p2 = Vec3.copy(size).sub(new Vec3(0, 1, 0));
    switch (rotation) {
      case 1:
        this.boundingBox.p1.x -= size.x;
        this.boundingBox.p2.x -= size.x;
        break;
      case 2:
        this.boundingBox.p1.x -= size.x;
        this.boundingBox.p2.x -= size.x;
        this.boundingBox.p1.z -= size.z;
        this.boundingBox.p2.z -= size.z;
        break;
      case 3:
        this.boundingBox.p1.z -= size.z;
        this.boundingBox.p2.z -= size.z;
        break;
    }

    // Strange coordinate transform.
    var len = size.x
      , dir = mirror
      , offset = new BlockPos(0, 0, 0);
    if (mirror == 1) {
      if (rotation != 1 || rotation != 3) {
        len = size.z;
        if (rotate == 2)
          dir = 3;
        else
          dir = 2;
      } else
        dir = RotationUtils.rotate(rotate, 2);
      offset = offset.relative(dir, len);
    } else if (mirror == 2) {
      if (rotation != 1 || rotation != 3) {
        if (rotate == 2)
          dir = 5;
        else
          dir = 4;
      } else {
        dir = RotationUtils.rotate(rotate, 4);
        len = size.z;
      }
      offset = offset.relative(dir, len);
    }

    this.boundingBox.p1.x += offset.x;
    this.boundingBox.p1.z += offset.z;
    this.boundingBox.p2.x += offset.x;
    this.boundingBox.p2.z += offset.z;

    this.boundingBox.p1 = this.boundingBox.p1.add(this.origin);
    this.boundingBox.p2 = this.boundingBox.p2.add(this.origin);
  }

  moveBoundingBox(x, y, z) {
    this.boundingBox.move(new Vec3(x, y, z));
    this.origin.x += x;
    this.origin.y += y;
    this.origin.z += z;
  }

  postProcess() {

  }
}

module.exports = { TemplateStructurePiece };