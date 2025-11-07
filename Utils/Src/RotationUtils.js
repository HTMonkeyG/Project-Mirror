var RotationUtils = {
  rotate(a1, a2) {
    var v3, v4;

    if (a2 != 2 && a2 != 3 && a2 != 4 && a2 != 5)
      return a2;
    v3 = a1 - 1;
    if (!v3)
      return Facing.getClockWise(a2);
    v4 = v3 - 1;
    if (!v4)
      return Facing.getOpposite(a2);
    if (v4 != 1)
      return a2;
    return Facing.getCounterClockWise(a2);
  }
};
var Facing = {
  getClockWise(a1) {
    if (a1 == 2)
      return 5;
    if (a1 == 3)
      return 4;
    if (a1 == 4 || a1 != 5)
      return 2;
    return 3;
  },
  getOpposite(a1) {
    switch (a1) {
      case 0:
        return 1;
      case 1:
        return 0;
      case 2:
        return 3;
      case 3:
        return 2;
      case 4:
        return 5;
      case 5:
        return 4;
      default:
        return a1;
    }
  },
  getCounterClockWise(a1) {
    switch (a1) {
      case 2:
        return 4;
      case 3:
        return 5;
      case 4:
        return 3;
    }
    return 2;
  }
};

exports.Facing = Facing;
exports.RotationUtils = RotationUtils;