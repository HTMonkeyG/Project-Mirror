const { BlockPos } = require("../../Utils/Structs");

class LegacyStructureSettings {
  static copy(settings) {
    var result = new LegacyStructureSettings();
    result.mirror = settings.mirror;
    result.rotation = settings.rotation;
  }

  constructor() {
    this.rotation = 0;
    this.mirror = 0;
  }

  getRotation() {
    return this.rotation
  }

  getMirror() {
    return this.mirror
  }
}

class LegacyStructureTemplate {
  static calculateConnectedPosition(settings, offset, settings_, blockPos) {
    var v9 = offset.x
      , v10 = offset.z
      , v11 = settings.mirror - 1;
    if (v11) {
      if (v11 == 1)
        v9 ^= 0x80000000;
    } else
      v10 ^= 0x80000000;
    switch (settings.direction) {
      case 1:
        [v10, v9] = [v9, v10];
        v9 ^= 0x80000000;
        break;
      case 2:
        v10 ^= 0x80000000;
        break;
      case 3:
        [v10, v9] = [v9, v10];
        v10 ^= 0x80000000;
        break;
    }
    var v21 = new BlockPos(v9, offset.y, v10)
      , v14 = blockPos.x
      , v16 = blockPos.z;
    if (settings_.mirror == 1)
      v16 ^= 0x80000000;
    else if (settings_.mirror == 2)
      v14 ^= 0x80000000;
    switch (settings_.direction) {
      case 1:
        [v16, v14] = [v14, v16];
        v14 ^= 0x80000000;
        break;
      case 2:
        v16 ^= 0x80000000;
        v14 ^= 0x80000000;
        break;
      case 3:
        [v16, v14] = [v14, v16];
        v16 ^= 0x80000000;
        break;
    }
    var v20 = BlockPos(v14, blockPos.y, v16);
    return new BlockPos(
      v21.x - v20.x,
      v21.y - v20.y,
      v21.z - v20.z,
    )
  }

  constructor() {
    this.size = {
      x: 0,
      y: 0,
      z: 0
    };
    this.origin = new BlockPos(0, 0, 0)
  }

  getSize(rotation) {
    if (rotation == 1 || rotation == 3)
      return {
        x: this.z,
        y: this.y,
        z: this.x
      }
    else
      return {
        x: this.x,
        y: this.y,
        z: this.z
      }
  }
}

exports.LegacyStructureSettings = LegacyStructureSettings;
exports.LegacyStructureTemplate = LegacyStructureTemplate;