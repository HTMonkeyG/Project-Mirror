const { AABB, Vec3, BlockPos } = require("../../Utils/Structs.js")
  , { RotationUtils } = require("../../Utils/RotationUtils.js")
  , { LegacyStructureSettings } = require("./LegacyStructureSettings.js");

class TemplateStructurePiece {
  constructor(a) {
    this.a = a;
    this.boundingBox = new AABB(0, 0, 0, 0, 0, 0);
    this.origin = new BlockPos(0);
    this.settings = null;
    this.template = null;
  }

  setup(template, settings, pos) {
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
    this.boundingBox.p2 = new Vec3(0, 0, 0);
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

    var d, v11, v12 = size.x;
    if (mirror == 1) {
      if (((rotate - 1) & 0xFD) != 0) {
        v12 = size.z;
        if (rotate == 2)
          d = 3;
        else
          d = 2;
      } else
        d = RotationUtils.rotate(rotate, 2);
    } else if (mirror == 2) {
      if (((rotate - 1) & 0xFD) != 0) {
        if (rotate == 2)
          d = 5;
        else
          d = 4;
      } else {
        d = RotationUtils.rotate(rotate, 4);
        v12 = size.z;
      }
    }

    v11 = (new BlockPos(0, 0, 0)).relative(d, v12);
    this.boundingBox.p1.x += v11.x;
    this.boundingBox.p1.z += v11.z;
    this.boundingBox.p2.x += v11.x;
    this.boundingBox.p2.z += v11.z;
  }

  moveBoundingBox(x, y, z) {
    this.boundingBox.move(new Vec3(x, y, z));
    this.origin.x += x;
    this.origin.y += y;
    this.origin.z += z;
  }
}

module.exports = TemplateStructurePiece;