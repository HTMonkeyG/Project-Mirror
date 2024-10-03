const {
  Enchant,
  ProtectionEnchant,
  SwimEnchant,
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
Enchantments[0] = new ProtectionEnchant(0, 30, "enchantment.protect.all", "protection", 0xF);
Enchantments[1] = new ProtectionEnchant(1, 10, "enchantment.protect.fire", "fire_protection", 0xF);
Enchantments[2] = new ProtectionEnchant(2, 10, "enchantment.protect.fall", "feather_falling", 0x4);
Enchantments[3] = new ProtectionEnchant(3, 3, "enchantment.protect.explosion", "blast_protection", 0xF);
Enchantments[4] = new ProtectionEnchant(4, 10, "enchantment.protect.projectile", "projectile_protection", 0xF);
Enchantments[4] = new ProtectionEnchant(5, 1, "enchantment.protect.thorns", "thorns", 0xF);

// Swim
Enchantments[8] = new SwimEnchant(8, 3, "enchantment.waterWorker", "aqua_affinity");
Enchantments[6] = new SwimEnchant(6, 3, "enchantment.oxygen", "respiration");
Enchantments[7] = new SwimEnchant(7, 3, "enchantment.waterWalker", "depth_strider");

// Melee
Enchantments[9] = new SwimEnchant(9, 30, "enchantment.damage.all", "sharpness");
Enchantments[10] = new SwimEnchant(10, 10, "enchantment.damage.undead", "smite");
Enchantments[11] = new SwimEnchant(11, 10, "enchantment.damage.arthropods", "bane_of_arthropods");
Enchantments[12] = new SwimEnchant(12, 10, "enchantment.knockback", "knockback");
Enchantments[13] = new SwimEnchant(13, 3, "enchantment.fire", "fire_aspect");

// Fishing
Enchantments[23] = new FishingEnchant(23, 3, "enchantment.lootBonusFishing", "luck_of_the_sea");
Enchantments[18] = new FishingEnchant(18, 3, "enchantment.lootBonusDigger", "fortune");
// So why looting belongs to fishing?
Enchantments[14] = new FishingEnchant(14, 3, "enchantment.lootBonus", "looting");
Enchantments[24] = new FishingEnchant(24, 3, "enchantment.fisingSpeed", "lure");

// Digging
Enchantments[15] = new DiggingEnchant(15, 30, "enchantment.digging", "efficiency");
Enchantments[17] = new DiggingEnchant(17, 10, "enchantment.durability", "unbreaking");
Enchantments[16] = new DiggingEnchant(16, 1, "enchantment.untouching", "silk_touch");

// Bow
Enchantments[19] = new BowEnchant(19, 30, "enchantment.arrowDamage", "power");
Enchantments[20] = new BowEnchant(20, 3, "enchantment.arrowKnockback", "punch");
Enchantments[21] = new BowEnchant(21, 3, "enchantment.arrowFire", "flame");
Enchantments[22] = new BowEnchant(22, 1, "enchantment.arrowInfinite", "infinity");

// Frost walker
Enchantments[25] = new FrostWalkerEnchant(25, 3, "enchantment.frostWalker", "frost_walker");

// Mending
Enchantments[26] = new MendingEnchant(26, 3, "enchantment.mending", "mending");

// Curse
Enchantments[27] = new CurseBindingEnchant(27, 1, "enchantment.curse.binding", "binding");
Enchantments[28] = new CurseBindingEnchant(28, 1, "enchantment.curse.vanishing", "vanishing");

// Trident
Enchantments[29] = new TridentImpalerEnchant(29, 10, "enchantment.tridentImpaling", "impaling");
Enchantments[30] = new TridentRiptideEnchant(30, 3, "enchantment.tridentRiptide", "riptide");
Enchantments[31] = new TridentLoyaltyEnchant(31, 30, "enchantment.tridentLoyalty", "loyalty");
Enchantments[32] = new TridentLoyaltyEnchant(32, 1, "enchantment.tridentChanneling", "channeling");

// Crossbow
Enchantments[33] = new CrossbowEnchant(33, 3, "enchantment.crossbowMultishot", "multishot");
Enchantments[34] = new CrossbowEnchant(34, 30, "enchantment.crossbowPiercing", "piercing");
Enchantments[35] = new CrossbowEnchant(35, 10, "enchantment.crossbowQuickCharge", "quick_charge");

// Soul speed
Enchantments[36] = new SwiftSneakEnchant(36, 1, "enchantment.soul_speed", "soul_speed");
Enchantments[37] = new SwiftSneakEnchant(37, 1, "enchantment.swift_sneak", "swift_sneak");

module.exports = Enchantments;