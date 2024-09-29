const { MT } = require("../../Utils/RandomSource.js")
  , { SimplifiedMT, SimplifiedMT_ } = require("./SimplifiedMT.js")
  , wt = require("worker_threads")
  , fs = require("fs")
  , pl = require("path")
  , WatMT = new WebAssembly.Instance(
    new WebAssembly.Module(
      fs.readFileSync(pl.join(__dirname, "./SimplifiedMT.wasm"))
    ), {}
  ).exports
  , self = {
    addEventListener: function (e, h) { wt.parentPort.on(e, _ => { h({ data: _ }) }) },
    postMessage: function (v) { wt.parentPort.postMessage({ data: v }) }
  };

const ENCH = [
  // 15 efficiency
  {
    range: [
      [1, 61], [11, 71], [21, 81], [31, 81], [41, 81]
    ],
    weight: 10
  },
  // 16 silk_touch
  {
    range: [
      [15, 61]
    ],
    weight: 1,
    exclude: 4
  },
  // 17 unbreaking
  {
    range: [
      [5, 61], [13, 71], [21, 81]
    ],
    weight: 5
  },
  // 18 fortune
  {
    range: [
      [15, 61], [24, 71], [33, 81]
    ],
    weight: 2,
    exclude: 2
  }
], ID = {
  efficiency: 1,
  silk_touch: 2,
  unbreaking: 3,
  fortune: 4
};

// If opti is true, then this function won't return
// exact result, but only call RNG functions.
function selectEnch(modifiedLvl, random, opti) {
  var total = 0
    , type = []
    , result = []
    , v0, v1;

  for (var i = 0; i < ENCH.length; i++) {
    var k = ENCH[i];
    for (var j = k.range.length - 1; j >= 0; j--) {
      if (modifiedLvl >= k.range[j][0]) {
        type.push({
          type: i + 1,
          level: j + 1,
          weight: k.weight,
          exclude: k.exclude
        });
        total += k.weight;
        break;
      }
    }
  }
  var l = type.length;

  v0 = random.nextInt(total);
  if (v1 = type.length) {
    for (i = 0; i < type.length; i++) {
      v0 -= type[i].weight;
      if (v0 < 0) {
        opti || (result.push(type[i]), total -= type[i].weight, type.splice(i, 1));
        break;
      }
    }

    // In MCBE, this loop won't check whether enchantments
    // can be applied to specify item,
    // it does selections only.
    for (j = 1; random.nextInt(50) <= modifiedLvl; j++) {
      if (j >= l)
        break;

      if (opti) {
        random.random_int();
        continue;
      }

      v0 = random.nextInt(total);
      if (!type.length) continue;

      for (i = 0; i < type.length; i++) {
        v0 -= type[i].weight;
        if (v0 < 0)
          result.push(type[i]), total -= type[i].weight, type.splice(i, 1);
      }

      type = type.filter(function (v) {
        var a = result.at(-1).exclude;
        return a ? (v.type == a ? (total -= v.weight, false) : true) : true
      });
    }
  }

  // Unfortunately, display order of enchantments is independent of
  // the order in which they are selected, so we need to sort them.
  return result.sort(function (a, b) {
    return b.type - a.type
  });
}

function testSeed(random, seed, cost1, cost2, cost3, block, ench, level, slot) {
  random.setSeed(seed);
  var v0 = random.nextInt(8)
    , v1 = random.nextInt(block + 1)
    , v2 = v0 + v1 + (block >> 1) + 1
    , v3, v4;

  if (cost1 != Math.max(Math.trunc(v2 / 3), 1))
    return false;
  if (cost2 != Math.trunc(2 * v2 / 3) + 1)
    return false;
  if (cost3 != Math.max(v2, 2 * block))
    return false;

  // Because we're forced to use wooden pickaxe,
  // so we assume that enchant ability equals 15

  switch (slot) {
    case 2:
      v3 = random.nextInt(4) + random.nextInt(4) + 1 + cost1;
      v3 *= 0.85 + 0.3 * random.random_int() * 2.328306436538696e-10;
      v3 += 0.5;
      v3 = Math.max(1, Math.floor(v3));
      selectEnch(v3, random, true);

      for (var k = random.nextInt(2) + 3; k > 0; k--) random.nextInt();
    case 1:
      v3 = random.nextInt(4) + random.nextInt(4) + 1 + cost2;
      v3 *= 0.85 + 0.3 * random.random_int() * 2.328306436538696e-10;
      v3 += 0.5;
      v3 = Math.max(1, Math.floor(v3));
      selectEnch(v3, random, true);

      for (var k = random.nextInt(2) + 3; k > 0; k--) random.nextInt();
    case 0:
      v3 = random.nextInt(4) + random.nextInt(4) + 1 + cost3;
      v3 *= 0.85 + 0.3 * random.random_int() * 2.328306436538696e-10;
      v3 += 0.5;
      v3 = Math.max(1, Math.floor(v3));
      v4 = selectEnch(v3, random);

      break;
    default:
      return true;
  }

  if (v4[0].level != level && v4[0].type != ench)
    return false;

  return true;
}

var seeds = [], nextSeeds = [];

self.addEventListener("message", function (d) {
  var data = d.data
    , t0 = new Date();

  var end = data.minSeed + data.blockLength
    , cost1 = data.costs[0]
    , cost2 = data.costs[1]
    , cost3 = data.costs[2]
    , block = data.effectiveBlock
    , ench = data.ench
    , level = data.level
    , slot = data.slot
    , random = new SimplifiedMT_(0);

  if (data.type == "first") {
    seeds = [];
    for (var i = data.minSeed; i < end; i++)
      if (testSeed(random, i, cost1, cost2, cost3, block, ench, level, slot))
        seeds.push(i);
  } else if (data.type == "addition") {
    nextSeeds = [];
    for (var s of seeds)
      if (testSeed(random, s, cost1, cost2, cost3, block, ench, level, slot))
        nextSeeds.push(s);
    seeds = nextSeeds;
  }

  self.postMessage({
    type: "result",
    seeds: seeds,
    t: (new Date()) - t0
  })
});

/*
function aaaa(d) {
  var data = d.data
    , t0 = new Date();

  var end = data.minSeed + data.blockLength
    , cost1 = data.costs[0]
    , cost2 = data.costs[1]
    , cost3 = data.costs[2]
    , block = data.effectiveBlock
    , ench = data.ench
    , level = data.level
    , random = new SimplifiedMT(0);

  if (data.type == "first") {
    seeds = [];
    nextSeeds = [];
    for (var i = data.minSeed; i < end; i++)
      if (testSeed(random, i, cost1, cost2, cost3, block, ench, level))
        seeds.push(i);
  } else {
    nextSeeds = [];
    for (var s of seeds)
      if (testSeed(random, s, cost1, cost2, cost3, block, ench, level))
        nextSeeds.push(s);
    seeds = nextSeeds;
  }

  console.log({
    type: "result",
    seeds: seeds,
    t: (new Date()) - t0
  })
}

aaaa({
  data: {
    costs: [3, 8, 30],
    effectiveBlock: 15,
    minSeed: 12116055,
    blockLength: 2,
    type: "first",
    ench: ID.fortune,
    level: 3
  }
})

aaaa({
  data: {
    costs: [6, 14, 24],
    effectiveBlock: 12,
    minSeed: 12116055,
    blockLength: 2,
    ench: ID.efficiency,
    level: 3
  }
})*/