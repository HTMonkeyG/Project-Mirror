const WEIGHT = {
  "1": 1,
  "3": 2,
  "10": 5,
  "30": 10
};

const ACTIVATIONGROUP = {
  "0": 0,
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
  "6": 0,
  "7": 0,
  "8": 0,
  "25": 0,
  "36": 0,
  "37": 0,
  "9": 1,
  "10": 1,
  "11": 1,
  "13": 1,
  "14": 1,
  "16": 1,
  "17": 1,
  "18": 1,
  "21": 1,
  "23": 1,
  "29": 1,
  "12": 2,
  "15": 2,
  "19": 2,
  "20": 2,
  "22": 2,
  "24": 2,
  "26": 2,
  "27": 2,
  "28": 2,
  "30": 2,
  "31": 2,
  "32": 2,
  "33": 2,
  "34": 2,
  "35": 2
};

const COMPATIBILITYGROUP = {
  "0": 3,
  "1": 3,
  "3": 3,
  "4": 3,
  "7": 4,
  "25": 4,
  "9": 1,
  "10": 1,
  "11": 1,
  "16": 5,
  "18": 2,
  "22": 5,
  "26": 5,
  "30": 6,
  "31": 6
};

class EnchantmentInstance {
  constructor(enchantment, level) {
    this.enchantment = enchantment;
    this.level = level;
  }
}

function getEnchantCosts(random, availableBlock) {
  var v0 = random.nextInt(8)
    , v1 = random.nextInt(availableBlock + 1)
    , v2 = v0 + v1 + (availableBlock >> 1) + 1
  return [
    Math.max(Math.trunc(v2 / 3), 1),
    Math.trunc(2 * v2 / 3) + 1,
    Math.max(v2, 2 * availableBlock)
  ]
}

function determineCompatibility(id) {
  if (COMPATIBILITYGROUP[id])
    return COMPATIBILITYGROUP[id];
  else
    return 0
}

function determineActivation(id) {
  if (ACTIVATIONGROUP[id])
    return ACTIVATIONGROUP[id];
  else
    return 0
}

function getLegalEnchants(item) {
  var result = [];
  if (item) {
    var flag = item.compatiblityFlag;
    for (var ench of Enchantments)
      if (flag == -1 || ench.canEnchant(flag, 0))
        result.push(ench)
  }

  return result
}

function getAvailableEnchantmentResults(item, modifiedLevel, allowTreasure) {
  var a = getLegalEnchants(item)
    , result = [];

  for (var ench of a)
    if (!ench.isTreasure() || allowTreasure)
      for (var l = ench.getMaxLevel(); l >= ench.getMinLevel(); l--) {
        if (modifiedLevel >= ench.getMinCost(l)) {
          var weight = 0;
          weight = WEIGHT[ench.weightFactor];

          result.push({
            ench: new EnchantmentInstance(ench, l),
            weight: weight
          });

          break;
        }
      }

  return result
}

function addEnch(a, b) {
  for (var c of a)
    if (!c.enchantment.isCompatibleWith(b.enchantment))
      return;

  a.push(b)
}

function selectEnchantments(random, item, enchantLevel, enchantAbility, allowTreasure) {
  var result = [];
  enchantAbility += item.enchantAbility;

  if (enchantAbility <= 0)
    return result;

  var modifiedLevel = random.nextInt((enchantAbility >> 2) + 1) + random.nextInt((enchantAbility >> 2) + 1);
  modifiedLevel += 1 + enchantLevel;
  modifiedLevel *= 0.85 + 0.3 * random.random_int() * 2.328306436538696e-10;
  modifiedLevel += 0.5;
  modifiedLevel = Math.max(1, Math.floor(modifiedLevel));

  var primaryEnch = getAvailableEnchantmentResults(item, modifiedLevel, allowTreasure)
    , totalWeight = 0
    , w, l = primaryEnch.length;;

  if (!primaryEnch.length)
    return result;

  for (var e of primaryEnch)
    totalWeight += e.weight;

  w = random.nextInt(totalWeight);

  for (var i = 0; i < primaryEnch.length; i++) {
    w -= primaryEnch[i].weight;
    if (w < 0) {
      totalWeight -= primaryEnch[i].weight;
      result.push(primaryEnch[i].ench);
      primaryEnch.splice(i, 1);
      break;
    }
  }

  for (var i = 1; modifiedLevel >= random.nextInt(50) && i < l; i++) {
    w = random.nextInt(totalWeight);
    if (!primaryEnch.length) continue;

    for (var j = 0; j < primaryEnch.length; j++) {
      w -= primaryEnch[j].weight;
      if (w < 0) {
        totalWeight -= primaryEnch[j].weight;
        addEnch(result, primaryEnch[j].ench);
        primaryEnch.splice(j, 1);
        var a = Long.fromInt(modifiedLevel);
        a = a.mul(4).mul(0x66666667).high >>> 0;
        a >>= 1;
        modifiedLevel = (a >>> 31) + 1 + a;
        break;
      }
    }
  }

  // Unfortunately, display order of enchantments is independent of
  // the order in which they are selected, so we need to sort them.
  return result.sort(function (a, b) {
    return b.enchantment.variant - a.enchantment.variant
  });
}

module.exports = {
  getEnchantCosts: getEnchantCosts,
  determineCompatibility: determineCompatibility,
  determineCompatibility: determineActivation,
  getAvailableEnchantmentResults: getAvailableEnchantmentResults,
  getLegalEnchants: getLegalEnchants,
  selectEnchantments: selectEnchantments
}

const Enchantments = require("../Registries/EnchantmentRegistries.js");
const Long = require("../Utils/Long.js");
