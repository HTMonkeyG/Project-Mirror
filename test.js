const PerlinNoise = require("./Utils/Noises.js").PerlinNoise
  , { MT } = require("./Utils/RandomSource.js")

var a = new MT(0x5BD942DD);

var c = new PerlinNoise(a, 1);

c.getRegion2D({ x: 1, y: 2 }, 10, 10, { x: 1, y: 1 })
/*
result = n = 5;
v13 = 0.0;
v14 = 1.0;
if (result > 0) {
  v15 = result;
  do {
    v16 = 1.0 / v14;
    v14 = v14 * 0.5;
    v13 = v13 + v16;
    --v15;
  }
  while (v15);
}
b = 1.0 / v13;

console.log(b, v13, Math.pow(2.0, n - 1) / (Math.pow(2.0, n) - 1.0))*/