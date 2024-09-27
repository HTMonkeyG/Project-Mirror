const { MT } = require("../../Utils/RandomSource.js")
  , SimplifiedMT = require("./SimplifiedMT.js");

var a = new MT(1145)
  , b = new SimplifiedMT(1145)

console.log(a, b)

for (var i = 0; i < 3; i++) console.log(a.nextInt(), b.nextInt());


//console.log(a, b)