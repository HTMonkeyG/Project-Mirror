class OreFeature {
  constructor(oreSize, replaceRules) {
    this.oreSize = oreSize;
    this.oreSizeInv = 1 / oreSize;
    this.replaceRules = replaceRules || [];
    this.discardAirExposure = 0;
  }

  setRules(replaceRules) {
    this.replaceRules = replaceRules
  }

  place(random, blockPos){

  }
} 