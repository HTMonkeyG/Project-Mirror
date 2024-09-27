const { MT } = require("../../Utils/RandomSource.js")
  , SimplifiedMT = require("./SimplifiedMT.js")
  , wt = require("worker_threads")
  , fs = require("fs")
  , pl = require("path")
  , self = {
    addEventListener: function (e, h) { wt.parentPort.on(e, _ => { h({ data: _ }) }) },
    postMessage: function (v) { wt.parentPort.postMessage({ data: v }) }
  };

function calc(start, length, data, random) {
  return new Promise(function (res, rej) {
    var end = start + length
      , cost1 = data.costs[0]
      , cost2 = data.costs[1]
      , cost3 = data.costs[2]
      , block = data.effectiveBlock
      , seeds = [];

    for (var i = start; i < end; i++) {
      random.setSeed(i);
      var v0 = random.nextInt(8)
        , v1 = random.nextInt(block + 1)
        , v2 = v0 + v1 + (block >> 1) + 1;

      if (cost1 != Math.max(Math.floor(v2 / 3), 1))
        continue;
      if (cost2 != Math.floor(2 * v2 / 3) + 1)
        continue;
      if (cost3 != Math.max(v2, 2 * block))
        continue;
      seeds.push(i);
    }

    res(seeds)
  })
}

async function calcAll(data) {
  var random = new MT(0)
    , subblock = Math.floor(data.blockLength / 4096)
    , tail = data.blockLength % 4096
    , seeds = [];
  /*for (var s = data.minSeed, i = 0; i < data.blockLength; i += subblock) {
    seeds.concat(await calc(s + i, subblock, data, random));
  }
  seeds.concat(await calc(s + i - subblock, tail, data, random));

  return seeds*/
}

self.addEventListener("message", function (d) {
  var data = d.data
    , t0 = new Date();

  /*calcAll(data).then(function (s) {
    self.postMessage(s)
  })*/
  var end = data.minSeed + data.blockLength
    , cost1 = data.costs[0]
    , cost2 = data.costs[1]
    , cost3 = data.costs[2]
    , block = data.effectiveBlock
    , seeds = []
    , random = new WebAssembly.Instance(
      new WebAssembly.Module(
        //new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])
        fs.readFileSync(pl.join(__dirname, "./SimplifiedMT.wasm"))
      ), {}
    ).exports
    , random = new SimplifiedMT(0)
    //, random = new MT(0);

  for (var i = data.minSeed; i < end; i++) {
    random.setSeed(i);
    var v0 = random.nextInt(8)
      , v1 = random.nextInt(block + 1)
      , v2 = v0 + v1 + (block >> 1) + 1;

    if (cost1 != Math.max(Math.floor(v2 / 3), 1))
      continue;
    if (cost2 != Math.floor(2 * v2 / 3) + 1)
      continue;
    if (cost3 != Math.max(v2, 2 * block))
      continue;
    seeds.push(i);
  }

  self.postMessage({ seeds: seeds, t: (new Date()) - t0 })
});