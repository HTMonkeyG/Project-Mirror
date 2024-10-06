const {
  ProtectionEnchant,
  SwimEnchant,
  MeleeWeaponEnchant,
  FishingEnchant,
  DiggingEnchant,
  BowEnchant,
  CrossbowEnchant,
  CurseBindingEnchant,
  FrostWalkerEnchant,
  MendingEnchant,
  SwiftSneakEnchant,
  TridentChannelingEnchant,
  TridentImpalerEnchant,
  TridentLoyaltyEnchant,
  TridentRiptideEnchant
} = require("../Enchantment/Enchant.js");

var Enchantments = [];

// Protection
Enchantments[0] = new ProtectionEnchant(0, 30, "enchantment.protect.all", "protection", 15, 0);
Enchantments[1] = new ProtectionEnchant(1, 10, "enchantment.protect.fire", "fire_protection", 15, 0);
Enchantments[2] = new ProtectionEnchant(2, 10, "enchantment.protect.fall", "feather_falling", 4, 0);
Enchantments[3] = new ProtectionEnchant(3, 3, "enchantment.protect.explosion", "blast_protection", 15, 0);
Enchantments[4] = new ProtectionEnchant(4, 10, "enchantment.protect.projectile", "projectile_protection", 15, 0);
Enchantments[5] = new ProtectionEnchant(5, 1, "enchantment.protect.thorns", "thorns", 2, 13);

// Swim
Enchantments[8] = new SwimEnchant(8, 3, "enchantment.waterWorker", "aqua_affinity", 1, 0);
Enchantments[6] = new SwimEnchant(6, 3, "enchantment.oxygen", "respiration", 1, 0);
Enchantments[7] = new SwimEnchant(7, 3, "enchantment.waterWalker", "depth_strider", 4, 0);

// Melee
Enchantments[9] = new MeleeWeaponEnchant(9, 30, "enchantment.damage.all", "sharpness", 16, 512);
Enchantments[10] = new MeleeWeaponEnchant(10, 10, "enchantment.damage.undead", "smite", 16, 512);
Enchantments[11] = new MeleeWeaponEnchant(11, 10, "enchantment.damage.arthropods", "bane_of_arthropods", 16, 512);
Enchantments[12] = new MeleeWeaponEnchant(12, 10, "enchantment.knockback", "knockback", 16, 0);
Enchantments[13] = new MeleeWeaponEnchant(13, 3, "enchantment.fire", "fire_aspect", 16, 0);

// Fishing
Enchantments[23] = new FishingEnchant(23, 3, "enchantment.lootBonusFishing", "luck_of_the_sea", 4096, 0);
Enchantments[18] = new FishingEnchant(18, 3, "enchantment.lootBonusDigger", "fortune", 3648, 0);
// So why looting belongs to fishing?
Enchantments[14] = new FishingEnchant(14, 3, "enchantment.lootBonus", "looting", 16, 0);
Enchantments[24] = new FishingEnchant(24, 3, "enchantment.fisingSpeed", "lure", 4096, 0);

// Digging
Enchantments[15] = new DiggingEnchant(15, 30, "enchantment.digging", "efficiency", 3648, 128);
Enchantments[17] = new DiggingEnchant(17, 10, "enchantment.durability", "unbreaking", 73343, 3334592);
Enchantments[16] = new DiggingEnchant(16, 1, "enchantment.untouching", "silk_touch", 3648, 128);

// Bow
Enchantments[19] = new BowEnchant(19, 30, "enchantment.arrowDamage", "power", 32, 0);
Enchantments[20] = new BowEnchant(20, 3, "enchantment.arrowKnockback", "punch", 32, 0);
Enchantments[21] = new BowEnchant(21, 3, "enchantment.arrowFire", "flame", 32, 0);
Enchantments[22] = new BowEnchant(22, 1, "enchantment.arrowInfinite", "infinity", 32, 0);

// Frost walker
Enchantments[25] = new FrostWalkerEnchant(25, 3, "enchantment.frostWalker", "frost_walker", 4, 0);

// Mending
Enchantments[26] = new MendingEnchant(26, 3, "enchantment.mending", "mending", 73343, 3334592);

// Curse
Enchantments[27] = new CurseBindingEnchant(27, 1, "enchantment.curse.binding", "binding", 278543, 0);
Enchantments[28] = new CurseBindingEnchant(28, 1, "enchantment.curse.vanishing", "vanishing", -1, 0);

// Trident
Enchantments[29] = new TridentImpalerEnchant(29, 10, "enchantment.tridentImpaling", "impaling", 0x8000, 0);
Enchantments[30] = new TridentRiptideEnchant(30, 3, "enchantment.tridentRiptide", "riptide", 0x8000, 0);
Enchantments[31] = new TridentLoyaltyEnchant(31, 30, "enchantment.tridentLoyalty", "loyalty", 0x8000, 0);
Enchantments[32] = new TridentChannelingEnchant(32, 1, "enchantment.tridentChanneling", "channeling", 0x8000, 0);

// Crossbow
Enchantments[33] = new CrossbowEnchant(33, 3, "enchantment.crossbowMultishot", "multishot", 0x10000, 0);
Enchantments[34] = new CrossbowEnchant(34, 30, "enchantment.crossbowPiercing", "piercing", 0x10000, 0);
Enchantments[35] = new CrossbowEnchant(35, 10, "enchantment.crossbowQuickCharge", "quick_charge", 0x10000, 0);

// Soul speed
Enchantments[36] = new SwiftSneakEnchant(36, 1, "enchantment.soul_speed", "soul_speed", 4, 0);
Enchantments[37] = new SwiftSneakEnchant(37, 1, "enchantment.swift_sneak", "swift_sneak", 8, 0);

module.exports = Enchantments;