const fs = require("fs")
  , pl = require("path")
  , { MT } = require("../../Utils/RandomSource.js")
  , { SimplifiedMT, SimplifiedMT_ } = require("./SimplifiedMT.js")

var a = new WebAssembly.Instance(
  new WebAssembly.Module(
    //new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])
    fs.readFileSync(pl.join(__dirname, "./SimplifiedMT.wasm"))
  ), {}
).exports;

a.setSeed(0);

var b = new SimplifiedMT(0), c = new MT(0), d = new SimplifiedMT_(0)

var t0 = new Date();
for (var i = 0; i < 1000000; i++) {
  a.setSeed(i); //a.nextInt()
}

console.log((new Date()) - t0)

var t0 = new Date();
for (var i = 0; i < 1000000; i++) {
  b.setSeed(i); //b.nextInt()
}

console.log((new Date()) - t0)

t0 = new Date();
for (var i = 0; i < 1000000; i++) {
  c.setSeed(i); //c.nextInt()
}
console.log((new Date()) - t0)

t0 = new Date();
for (var i = 0; i < 1000000; i++) {
  d.setSeed(i); //d.nextInt()
}
console.log((new Date()) - t0)

c.setSeed(5201314);
b.setSeed(5201314);

for (var i = 0; i < 36; i++) {
  if(c.nextInt() != b.nextInt())
    throw i
}

console.log(c.nextInt(), b.nextInt())
console.log(c.nextInt(), b.nextInt())
console.log(c.nextInt(), b.nextInt())