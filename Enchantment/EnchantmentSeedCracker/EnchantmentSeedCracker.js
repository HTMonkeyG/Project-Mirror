const { MT } = require("../../Utils/RandomSource.js")
  , wt = require("worker_threads")
  , pl = require("path")
  , os = require('os')
  , Worker = wt.Worker;
Worker.prototype.addEventListener = Worker.prototype.on;

function firstInput(costs, effectiveBlock) {
  return new Promise(function (res, rej) {
    var workers = []
      , completed = 0
      , average = 0
      , seeds = []
      , maxThread = Math.max(os.cpus().length - 1, 1);

    for (workers = [], i = 0; i < maxThread; i++)
      workers[i] = new Worker(pl.join(__dirname, "./Worker.js"));

    workers.forEach(function (a, b) {
      a.addEventListener("message", function (e) {
        seeds = seeds.concat(e.data.seeds)
        completed++;
        average += e.data.t;
        if (completed >= maxThread) {
          average /= maxThread;
          res({
            seeds: seeds,
            avrTime: average
          })
        }
        a.terminate();
      }, !1)
    });

    var m = (2 ** 32)
      , blockLength = Math.floor(m / maxThread)
      , tail = m % blockLength;
    for (var i = 0, j = 0; j < maxThread - 1; i += blockLength, j++) {
      workers[j].postMessage({
        blockLength: blockLength,
        costs: costs,
        minSeed: i,
        effectiveBlock: effectiveBlock
      });
    }

    workers[maxThread - 1].postMessage({
      blockLength: blockLength + tail,
      costs: costs,
      minSeed: i,
      effectiveBlock: effectiveBlock
    });
  });
}

async function main() {
  console.log(await firstInput([8, 17, 28], 14))
}

main();
