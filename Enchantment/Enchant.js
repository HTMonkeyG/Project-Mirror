class Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    this.name = name;
    this.weightFactor = weightFactor;
    this.variant = variant;
    this.id = id;
    /*
     * Bit 0: armor_head
     * Bit 1: armor_torso
     * Bit 2: armor_feet
     * Bit 3: armor_legs
     * Bit 4: sword
     * Bit 5: bow
     * Bit 6: hoe
     * Bit 7: shears
     * Bit 8: flintsteel
     * Bit 9: axe
     * Bit 10: pickaxe
     * Bit 11: shovel
     * Bit 12: fishing_rod
     * Bit 13: carrot_stick
     * Bit 14: elytra
     * Bit 15: spear (trident)
     * Bit 16: crossbow
     * Bit 17: shield
     * Bit 18: cosmetic_head
     */
    /**
     * Decides whether this enchantment can be applied
     * 
     * on table for specific item
     */
    this.compatiblityFlag = compatiblityFlag;
  }

  getMinCost(l) {
    return l * 10 + 1
  }

  getMaxCost(l) { }

  getMaxLevel() { }
}

class ProtectionEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }

  getMinCost(l) {
    switch (this.variant) {
      case 0:
        return 11 * (l - 1) + 1;
      case 1:
        return 8 * (l - 1) + 10;
      case 2:
        return 6 * (l - 1) + 5;
      case 3:
        return 8 * (l - 1) + 5;
      case 4:
        return 6 * (l - 1) + 3;
      case 5:
        return 20 * (l - 1) + 10;
      default:
        return super.getMinCost(l);
    }
  }
}

class SwimEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class FishingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class DiggingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class BowEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class FrostWalkerEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class MendingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class CurseBindingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class TridentImpalerEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class TridentRiptideEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class TridentLoyaltyEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class TridentChannelingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class CrossbowEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

class SwiftSneakEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatiblityFlag) {
    super(variant, weightFactor, name, id, compatiblityFlag);
  }
}

exports.Enchant = Enchant;
exports.ProtectionEnchant = ProtectionEnchant;
exports.SwimEnchant = SwimEnchant;
exports.FishingEnchant = FishingEnchant;
exports.DiggingEnchant = DiggingEnchant;
exports.BowEnchant = BowEnchant;
exports.CrossbowEnchant = CrossbowEnchant;
exports.CurseBindingEnchant = CurseBindingEnchant;
exports.FrostWalkerEnchant = FrostWalkerEnchant;
exports.MendingEnchant = MendingEnchant;
exports.SwiftSneakEnchant = SwiftSneakEnchant;
exports.TridentChannelingEnchant = TridentChannelingEnchant;
exports.TridentImpalerEnchant = TridentImpalerEnchant;
exports.TridentLoyaltyEnchant = TridentLoyaltyEnchant;
exports.TridentRiptideEnchant = TridentRiptideEnchant;