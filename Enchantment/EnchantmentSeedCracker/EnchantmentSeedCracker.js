const { MT } = require("../../Utils/RandomSource.js")
  , wt = require("worker_threads")
  , pl = require("path")
  , os = require('os')
  , Worker = wt.Worker;
Worker.prototype.addEventListener = Worker.prototype.on;
Worker.prototype.removeEventListener = Worker.prototype.removeListener;

const ID = {
  efficiency: 1,
  silk_touch: 2,
  unbreaking: 3,
  fortune: 4
};

var workers = []
  , maxThread = Math.max(os.cpus().length - 1, 1);

workers.invokeCtr = 0;

console.log(maxThread)

for (workers = [], i = 0; i < maxThread; i++)
  workers[i] = new Worker(pl.join(__dirname, "./Worker.js"));

function firstInput(costs, effectiveBlock, ench, level, slot) {
  return new Promise(function (res, rej) {
    var completed = 0
      , average = 0
      // In general, the first input will return more than 10M seeds,
      // which is too long to storage.
      // So we record number of seeds only.
      , seeds = { length: 0 };
    workers.invokeCtr = 1;
    workers.forEach(function (a, b) {
      var c;
      a.addEventListener("message", c = function (e) {
        seeds.length += e.data.seeds.length;
        completed++;
        average += e.data.t;
        a.removeEventListener("message", c);
        if (completed >= maxThread) {
          average /= maxThread;
          res({
            seeds: seeds,
            avrTime: average
          })
        }
      }, !1)
    });

    var m = (2 ** 32)
      , blockLength = Math.floor(m / maxThread)
      , tail = m % blockLength;
    if (maxThread > 1)
      for (var i = 0, j = 0; j < maxThread - 1; i += blockLength, j++) {
        workers[j].postMessage({
          type: "first",
          blockLength: blockLength,
          costs: costs,
          minSeed: i,
          effectiveBlock: effectiveBlock,
          ench: ench,
          level: level
        });
      }

    workers[maxThread - 1].postMessage({
      type: "first",
      blockLength: blockLength + tail,
      costs: costs,
      minSeed: i || 0,
      effectiveBlock: effectiveBlock,
      ench: ench,
      level: level,
      slot: slot
    });
  });
}

function addInput(time, costs, effectiveBlock, ench, level, slot) {
  return new Promise(function (res, rej) {
    var completed = 0
      , average_ = 0
      , seeds = workers.invokeCtr < 6 ? { length: 0 } : [];
    workers.invokeCtr++;
    workers.forEach(function (a, b) {
      var c;
      a.addEventListener("message", c = function (e) {
        if (seeds.concat)
          seeds = seeds.concat(e.data.seeds);
        else
          seeds.length += e.data.seeds.length;

        completed++;
        average_ += e.data.t;
        a.removeEventListener("message", c);
        if (completed >= maxThread) {
          average_ /= maxThread;
          res({
            seeds: seeds,
            avrTime: average_ + time
          })
        }
      }, !1)
    });

    for (var j = 0; j < maxThread; j++) {
      workers[j].postMessage({
        type: "addition",
        costs: costs,
        effectiveBlock: effectiveBlock,
        ench: ench,
        level: level,
        slot: slot
      });
    }
  });
}

async function main() {
  firstInput([3, 8, 30], 15, ID.fortune, 3)
    .then(_ => addInput(_.avrTime, [6, 14, 28], 14, ID.fortune, 2, 2))
    .then(_ => addInput(_.avrTime, [5, 11, 26], 13, ID.fortune, 2, 2))
    .then(_ => addInput(_.avrTime, [6, 14, 24], 12, ID.efficiency, 3, 2))
    .then(_ => addInput(_.avrTime, [3, 7, 22], 11, ID.fortune, 2, 2))
    .then(_ => addInput(_.avrTime, [5, 11, 20], 10, ID.efficiency, 3, 2))
    .then(_ => addInput(_.avrTime, [4, 9, 18], 9))
    .then(_ => addInput(_.avrTime, [4, 10, 16], 8))
    .then(_ => addInput(_.avrTime, [2, 5, 14], 7))
    .then(_ => addInput(_.avrTime, [4, 9, 13], 6))
    .then(_ => addInput(_.avrTime, [2, 5, 10], 5))
    .then(_ => addInput(_.avrTime, [3, 7, 10], 4))
    .then(_ => addInput(_.avrTime, [1, 4, 6], 3))
    .then(_ => addInput(_.avrTime, [1, 4, 5], 2))
    .then(_ => console.log(_));
}

main();
