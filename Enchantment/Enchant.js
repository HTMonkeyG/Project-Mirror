const EnchantUtils = require("./EnchantUtils.js");

class Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
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
    this.compatibilityFlag = compatibilityFlag || 0;
    this.compatibilityFlag2 = compatibilityFlag2 || 0;
    this.compatibilityGroup = EnchantUtils.determineCompatibility(variant);

    this.treasure = false;
  }

  getMinCost(l) {
    return l * 10 + 1
  }

  getMaxCost(l) {
    return this.getMinCost(l) + 5
  }

  isTreasure() {
    return this.treasure
  }

  getMinLevel() {
    return 1
  }

  getMaxLevel() {
    return 1
  }

  isCompatibleWith(ench) {
    return !this.compatibilityGroup || ench.compatibilityGroup != this.compatibilityGroup
  }

  canEnchant(flag, a) {
    return a || flag && ((flag & this.compatibilityFlag) != 0 || (a & this.compatibilityFlag2) != 0);
  }
}

class ProtectionEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
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

  getMaxLevel() {
    return (this.variant != 5) + 3;
  }
}

class SwimEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }

  getMinCost(l) {
    if (this.variant == 6 || this.variant == 7) {
      result = (10 * l);
      if (result > 0)
        return result;
    }
    else if (this.variant == 8) {
      return 1;
    }
    return super.getMinCost(l);
  }

  getMaxLevel() {
    if (this.variant == 6 || this.variant == 7)
      return 3;
    if (this.variant == 8)
      return 1;
    return 1
  }
}

class MeleeWeaponEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }

  getMinCost(l) {
    switch (this.variant) {
      case 9:
        return (11 * (l - 1) + 1);
      case 0xA:
      case 0xB:
        return (8 * (l - 1) + 5);
      case 0xC:
        return (20 * (l - 1) + 5);
      case 0xD:
        return (20 * (l - 1) + 10);
    }
    return super.getMinCost(this, l);
  }

  getMaxLevel() {
    if (this.variant == 9 || this.variant == 10 || this.variant == 11)
      return 5;
    if (this.variant == 12 || this.variant == 13)
      return 2;
    return 1
  }
}

class FishingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }

  getMinCost(l) {
    return 9 * l + 6;
  }

  getMaxLevel() {
    return 3
  }
}

class DiggingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }

  getMinCost(l) {
    switch (this.variant) {
      case 0xF:
        return (10 * (l - 1) + 1);
      case 0x10:
        return 15;
      case 0x11:
        return (8 * (l - 1) + 5);
    }
    return (10 * l + 1);
  }

  getMaxLevel() {
    if (this.variant == 15)
      return 5;
    if (this.variant == 16 || this.variant != 17)
      return 1;
    return 3;
  }
}

class BowEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }
}

class FrostWalkerEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);

    this.treasure = true;
  }
}

class MendingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);

    this.treasure = true;
  }
}

class CurseBindingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);

    this.treasure = true;
  }
}

class TridentImpalerEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }
}

class TridentRiptideEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }
}

class TridentLoyaltyEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }
}

class TridentChannelingEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }
}

class CrossbowEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);
  }
}

class SwiftSneakEnchant extends Enchant {
  constructor(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2) {
    super(variant, weightFactor, name, id, compatibilityFlag, compatibilityFlag2);

    this.treasure = true;
  }
}

exports.Enchant = Enchant;
exports.ProtectionEnchant = ProtectionEnchant;
exports.SwimEnchant = SwimEnchant;
exports.MeleeWeaponEnchant = MeleeWeaponEnchant;
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