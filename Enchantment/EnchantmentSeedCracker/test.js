const { MT } = require("../../Utils/RandomSource.js")
  , SimplifiedMT = require("./SimplifiedMT.js");

var a = new MT(12116055)
  , b = new MT(169246)
  , random = new MT(0)
  , block = 15

random.setSeed(12116055);
var v0 = random.nextInt(8)
  , v1 = random.nextInt(block + 1)
  , v2 = v0 + v1 + (block >> 1) + 1
  , v3, v4, v5;
console.log(v2, v4 = Math.max(Math.trunc(v2 / 3), 1), Math.trunc(2 * v2 / 3) + 1, Math.max(v2, 2 * block))

v3 = random.nextInt(15) + random.nextInt(15) + 1 + v4;
v3 *= 0.85 + 0.3 * random.random_int() * 2.328306436538696e-10;
v3 += 0.5;
v3 = Math.max(1, Math.round(v3));
console.log(v3)

random.setSeed(169246);
var v0 = random.nextInt(8)
  , v1 = random.nextInt(block + 1)
  , v2 = v0 + v1 + (block >> 1) + 1
  , v3, v4, v5;
console.log(v2, v4 = Math.max(Math.trunc(v2 / 3), 1), Math.trunc(2 * v2 / 3) + 1, Math.max(v2, 2 * block))

v3 = random.nextInt(15) + random.nextInt(15) + 1 + v4;
v3 *= 0.85 + 0.3 * random.random_int() * 2.328306436538696e-10;
v3 += 0.5;
v3 = Math.max(1, Math.round(v3));
console.log(v3)
