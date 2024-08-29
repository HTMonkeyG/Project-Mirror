const fs = require('fs'),
  { MT, Long } = require('./utils.js');

String.prototype.hashCode = function () {
  var hash = Long.fromString("CBF29CE484222325", false, 16)
    , c = Long.fromString("100000001B3", false, 16);

  for (var i of (new TextEncoder()).encode(this))
    hash = Long.fromInt(i, false).xor(hash.mul(c));

  return Long.fromValue(hash, true);

  /*var hash = 0xCBF29CE484222325n

  for (var i of (new TextEncoder()).encode(this))
    hash = BigInt(i) ^ ((hash * 0x100000001B3n) & 0xFFFFFFFFFFFFFFFFn);

  return Long.fromString(hash.toString(16), true, 16)*/
};

const params = JSON.parse(fs.readFileSync("./params_gold.json", 'utf-8'));

function evalCoordRange(distribution, extent, rng, bias) {
  switch (distribution) {
    case "uniform":
      return rng.nextIntRange(extent[0], extent[1]) + bias;
    case "triangle":
      var t = (extent[1] - extent[0]) >> 1;
      return rng.nextIntRange(0, t + 1) + rng.nextIntRange(0, t + 1) + bias + extent[0];
  }
}

class ScatterParams {
  constructor(params, chunkX, chunkZ, rng) {
    this.chunkX = chunkX;
    this.chunkZ = chunkZ;
    this.params = params;
    this.ctr = params.distribution.iterations;
    this.rng = rng;
    if (params.distribution.scatter_chance) {
      var sc = params.distribution.scatter_chance;
      if (sc.numerator != sc.denominator && rng.nextInt(sc.denominator) >= sc.numerator)
        this.ctr = 0;
    }
  }

  [Symbol.iterator]() { return { next: this.next.bind(this) } }

  next() {
    if (this.empty())
      return {
        value: undefined,
        done: true
      };

    var posResult = [], done = this.empty();
    this.ctr--;
    for (var j of this.params.coordinate_eval_order) {
      var k = this.params.distribution[j];

      if (k)
        switch (j) {
          case "x":
            posResult[0] = evalCoordRange(k.distribution, k.extent, this.rng, this.chunkX << 4);
            break;
          case "y":
            posResult[1] = evalCoordRange(k.distribution, k.extent, this.rng, 0);
            break;
          case "z":
            posResult[2] = evalCoordRange(k.distribution, k.extent, this.rng, this.chunkZ << 4);
            break;
        }
    }

    return {
      value: posResult,
      done: done
    }
  }

  empty() { return !this.ctr }
}

function ChunkPos(x, z) { return [x >> 4, z >> 4] }
function inRange(x, a, b) {
  return x > a && x < b;
}

function gen(worldSeed, params, chunkX, chunkZ) {
  var rng = new MT(worldSeed.low)
    , decorationSeed = worldSeed.low ^ (rng.nextInt() * chunkX + rng.nextInt() * chunkZ)
    , decorationRNG = new MT(decorationSeed)
    /*, placementSeed = params.identifier.hashCode()
      .add(
        Long.fromInt(decorationSeed, true)
          .shl(6)
          .add(Long.fromString("2654435769", true))
          .add(Long.fromInt(decorationSeed, true).shru(2))
      )
      .xor(Long.fromInt(decorationSeed, true))
      .low*/
    , placementSeed = (params.identifier.hashCode().low + (decorationSeed << 6) + 2654435769 + (decorationSeed >>> 2)) ^ decorationSeed
    , placementRNG = new MT(placementSeed)
    , scatterRNG = new MT(placementSeed)
    , scatter = new ScatterParams(params, chunkX, chunkZ, scatterRNG)
    , result = [];

  for (var pos of scatter)
    if (pos[1] > -64) {
      result.push(place(pos, params.placement.count, placementRNG))
    };

  for (var k of result) {
    k[3] = inRange(k[0], chunkX << 4, (chunkX + 1) << 4) && inRange(k[1], chunkZ << 4, (chunkZ + 1) << 4)
  }

  return result
}

function place(originalPos, oreSize, rng) {
  var v10 = rng.nextFloat()  // Rotate angle
    , v13 = Math.fround(oreSize * 0.125)  // Offset distance
    , v14 = Math.fround(v13 * Math.sin(v10 * 3.1415927))  // X offset
    , v15 = Math.fround(v13 * Math.cos(v10 * 3.1415927))  // Z offset
    , v139 = originalPos[0] + v14 + 8.0  // X pos
    , v20 = originalPos[1] + rng.nextInt(3) - 2.0  // Y pos
    , v143 = originalPos[2] + v15 + 8.0  // Z pos
    , v22 = v14 * -2
    , v21 = originalPos[1] + rng.nextInt(3) - 2.0 - v20
    , v19 = v15 * -2;

  var arr = [], v56 = 1 / oreSize, v28 = v56 * 3.1415927;

  for (var v52 = 0, v53 = 0; v52 < oreSize; v52++, v53 += 5) {
    arr[v53] = v139 + v52 * v22 * v56;
    arr[v53 + 1] = v20 + v21 * v52 * v56;
    arr[v53 + 2] = v143 + v19 * v52 * v56;
    v58 = rng.nextDouble() * oreSize;
    v57 = (((Math.sin(v52 * v28) + 1.0) * v58) * 0.03125) + 0.5;
    arr[v53 + 3] = v57 * v57;
    arr[v53 + 4] = Math.abs(v57);
  }

  var minPos = [0x7FFFFFFF, 0x7FFFFFFF, 0x7FFFFFFF]
    , maxPos = [-0x80000000, -0x80000000, -0x80000000]

  for (var v52 = 0; v52 < arr.length; v52 += 5) {
    var v77 = arr[v52 + 4];

    minPos[0] = Math.min(minPos[0], arr[v52] - v77);
    minPos[1] = Math.min(minPos[1], arr[v52 + 1] - v77);
    minPos[2] = Math.min(minPos[2], arr[v52 + 2] - v77);

    maxPos[0] = Math.max(maxPos[0], arr[v52] + v77);
    maxPos[1] = Math.max(maxPos[1], arr[v52 + 1] + v77);
    maxPos[2] = Math.max(maxPos[2], arr[v52 + 2] + v77);
  }

  return [
    (minPos[0] + maxPos[0]) >> 1,
    (minPos[1] + maxPos[1]) >> 1,
    (minPos[2] + maxPos[2]) >> 1
  ]
}

//var seed = Long.fromString("7290775714567635677");
var seed = Long.fromString("20240824");
console.log(gen(seed, params, ...ChunkPos(62467, -30187)))