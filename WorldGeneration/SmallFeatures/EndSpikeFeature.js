const PMU = require("../../Packages/Utils/main")
  , { MT } = PMU.RandomSource
  , Feature = require("../Feature");

class EndSpikeFeatrue extends Feature {
  static getSpikesForLevel(levelSeedLow) {
    var rand = new MT(levelSeedLow)
      , nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      , result = []
      , t;

    for (var i = 1; i < 10; i++) {
      t = rand.nextIntRaw() % (i + 1);
      [nums[i], nums[t]] = [nums[t], nums[i]];
    }

    for (var i = 0; i < 10; i++) {
      var radians = i * 0.62831855 - 6.2831855
        , posX = Math.floor(Math.cos(radians) * 42.0)
        , posZ = Math.floor(Math.sin(radians) * 42.0)
        , size = Math.floor(nums[i] / 3) + 2
        , height = nums[i] + 2 * (nums[i] + 38);

      result.push(new EndSpikeFeatrue(posX, posZ, size, height, nums[i] && nums[i] <= 2))
    }

    return result
  }

  constructor(x, z, size, height, hasCrystal) {
    super(0);
    this.posX = x;
    this.posZ = z;
    this.size = size;
    this.height = height;
    this.hasCrystal = !!hasCrystal;
  }

  place() {

  }
}

module.exports = EndSpikeFeatrue;