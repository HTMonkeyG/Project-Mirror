const { MT } = require("../Utils/RandomSource");
const EnchantUtils = require("./EnchantUtils.js");

var random = new MT(2)
random.setSeed(586939289);
var block = 15
  , v0 = random.nextInt(8)
  , v1 = random.nextInt(block + 1)
  , v2 = v0 + v1 + (block >> 1) + 1
  , c1 = Math.max(Math.trunc(v2 / 3), 1)
  , c2 = Math.trunc(2 * v2 / 3) + 1
  , c3 = Math.max(v2, 2 * block);

console.log(EnchantUtils.selectEnchantments(random, { enchantAbility: 10, compatiblityFlag: 16 }, c1, 0, false))
for (var k = random.nextInt(2) + 3; k > 0; k--) random.nextInt();
console.log(EnchantUtils.selectEnchantments(random, { enchantAbility: 10, compatiblityFlag: 16 }, c2, 0, false))
for (var k = random.nextInt(2) + 3; k > 0; k--) random.nextInt();
console.log(EnchantUtils.selectEnchantments(random, { enchantAbility: 10, compatiblityFlag: 16 }, c3, 0, false))