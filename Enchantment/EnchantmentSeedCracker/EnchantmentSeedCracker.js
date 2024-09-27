const { MT } = require("../../Utils/RandomSource.js")
  , wt = require("worker_threads")
  , pl = require("path")
  , os = require('os')
  , Worker = wt.Worker;
Worker.prototype.addEventListener = Worker.prototype.on;

var workers = []
  , completed = 0
  , average = 0
  , seeds = []
  , maxThread = Math.max(os.cpus().length - 1, 1);
  
maxThread = 8;

console.log(maxThread)

for (workers = [], i = 0; i < maxThread; i++)
  workers[i] = new Worker(pl.join(__dirname, "./Worker.js"));

function firstInput(costs, effectiveBlock) {
  return new Promise(function (res, rej) {
    completed = 0;
    average = 0;
    seeds = [];
    workers.forEach(function (a, b) {
      a.addEventListener("message", function (e) {
        if (completed >= maxThread)
          return;
        seeds = seeds.concat(e.data.seeds)
        completed++;
        average += e.data.t;
        if (completed >= maxThread) {
          console.log(0);
          average /= maxThread;
          res({
            seeds: seeds,
            avrTime: average
          })
        }
      }, !1)
    });

    var m = (2 ** 24)
      , blockLength = Math.floor(m / maxThread)
      , tail = m % blockLength;
    if(maxThread > 1)
      for (var i = 0, j = 0; j < maxThread - 1; i += blockLength, j++) {
        workers[j].postMessage({
          type: "first",
          blockLength: blockLength,
          costs: costs,
          minSeed: i,
          effectiveBlock: effectiveBlock
        });
      }

    workers[maxThread - 1].postMessage({
      type: "first",
      blockLength: blockLength + tail,
      costs: costs,
      minSeed: i || 0,
      effectiveBlock: effectiveBlock
    });
  });
}

var aaa=0;
function addInput(costs, effectiveBlock) {
  return new Promise(function (res, rej) {
    //console.log(average);
    var completed = 0
      , average_ = 0
      , seeds = [];
    workers.forEach(function (a, b) {
      a.addEventListener("message", function (e) {
        if (completed >= maxThread)
          return;
        seeds = seeds.concat(e.data.seeds)
        completed++;
        average_ += e.data.t;
        if (completed >= maxThread) {
          average_ /= maxThread;
          average += average_;
          //console.log(average, aaa++);
          res({
            seeds: seeds,
            avrTime: average
          })
        }
      }, !1)
    });

    for (var j = 0; j < maxThread; j++) {
      workers[j].postMessage({
        costs: costs,
        effectiveBlock: effectiveBlock
      });
    }
  });
}

async function main() {
  firstInput([3, 8, 30], 15)
  .then(_ => addInput([6, 14, 28], 14))
  .then(_ => addInput([5, 11, 26], 13))
  .then(_ => addInput([6, 14, 24], 12))
  .then(_ => addInput([3, 7, 22], 11))
  .then(_ => addInput([5, 11, 20], 10))
  .then(_ => addInput([4, 9, 18], 9))
  .then(_ => addInput([4, 10, 16], 8))
  .then(_ => addInput([2, 5, 14], 7))
  .then(_ =>addInput([4, 9, 13], 6))
  .then(_ =>addInput([2, 5, 10], 5))
  .then(_ =>addInput([3, 7, 10], 4))
  .then(_ =>addInput([1, 4, 6], 3))
  .then(_ =>addInput([1, 4, 5], 2))
  .then(_ => console.log(_));
}

main();
