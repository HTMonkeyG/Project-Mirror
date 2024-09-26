const BlockVolume = require("../../ChunkStorage/BlockVolume.js")
  , { MT } = require("../../Utils/RandomSource.js")
  , { BlockPos, AABB } = require("../../Utils/Structs.js")
  , TheEndGenerator = require("../WorldGenerator/TheEndGenerator.js")
  , StructureFeature = require("./StructureFeature.js")
  , TemplateStructurePiece = require("./TemplateStructurePiece.js");
const LegacyStructureSettings = require("./LegacyStructureSettings.js");

var BoundingBoxes = {
  base_floor: new AABB()
}

var Templates = {
  base_floor: {

  }
}

class EndCityFeature extends StructureFeature {
  constructor(worldSeedLow) {
    super(worldSeedLow);
    this.params = {
      spacing: 20,
      separation: 11,
      salt: 10387313,
      linearSeparation: false
    };
  }

  isFeatureChunk(random, chunkPos, levelSeedLow, dimension, generator) {
    var a = StructureFeature.getPotentialFeatureChunk(random, levelSeedLow, chunkPos.x, chunkPos.z, this.params);
    if (chunkPos.x != a.x || chunkPos.z != a.z)
      return false;
    if (!TheEndGenerator.isOutsideCentralIslandArea(chunkPos))
      return false;
    if (generator.getPreliminarySurfaceLevel(chunkPos.x << 4, chunkPos.z << 4) >= dimension.getMinHeight()
      && EndCityStart.getYPositionForFeature(chunkPos, dimension) >= 60)
      return true;
    return false
  }

  createStructureStart(dimension, random, chunkPos, generator) {
    return new EndCityStart(dimension, random, chunkPos);
  }

  postProcess(random, chunkPos) {

  }
}

class EndCityStart {
  static getYPositionForFeature(chunkPos, dimension) {
    var a = dimension.getGenerator()
      , b = a.getBlockVolumeDimensions()
      , c = new MT((chunkPos.x + 10387313 * chunkPos.z) | 0)
      , blockVolume = new BlockVolume(b.x, b.y, b.z, "air", dimension.getMinHeight())
      , v13 = 5, v14 = 5, v16, v17;

    a.prepareHeights(blockVolume, chunkPos);
    v16 = (c.nextIntRaw() & 3) - 1;

    if (v16) {
      v17 = v16 - 1;
      if (v17) {
        v17 == 1 && (v14 = -5);
      } else
        v13 = v14 = -5;
    } else
      v13 = -5;

    var v18 = dimension.getHeight() - 1
      , d = [
        blockVolume.getAboveTopSolidBlock(new BlockPos(7, v18, 7)),
        blockVolume.getAboveTopSolidBlock(new BlockPos(7, v18, 7 + v14)),
        blockVolume.getAboveTopSolidBlock(new BlockPos(7 + v13, v18, 7)),
        blockVolume.getAboveTopSolidBlock(new BlockPos(7 + v13, v18, 7 + v14))
      ];

    return Math.min(...d);
  }

  constructor(dimension, random, chunkPos) {
    var a = new MT((chunkPos.x + 10387313 * chunkPos.z) | 0)
      , direction = a.nextIntRaw() & 3
      , c;

    this.chunkX = chunkPos.x;
    this.chunkZ = chunkPos.z;
    this.pieces = [];

    if ((c = EndCityStart.getYPositionForFeature(chunkPos, dimension)) >= 60) {
      this.a = true;
      EndCityPieces.startHouseTower(new BlockPos(16 * chunkPos.x + 8, c, 16 * chunkPos.z + 8), random, direction, this.pieces)
    } else {
      this.a = false;
    }
  }
}

class EndCityPieces {
  static Generators = [
    TowerGenerator,
    FatTowerGenerator,
    TowerBridgeGenerator,
    HouseTowerGenerator
  ];

  static startHouseTower(blockPos, random, direction, pieces) {
    var v1;
    pieces.push(v1 = new EndCityPiece("base_floor", direction, blockPos, 1));
    pieces.push(v1 = EndCityPieces.createPiece("second_floor", direction, v1, new BlockPos(-1, 0, -1), 0));
    pieces.push(v1 = EndCityPieces.createPiece("third_floor", direction, v1, new BlockPos(-1, 4, -1), 0));
    pieces.push(v1 = EndCityPieces.createPiece("third_roof", direction, v1, new BlockPos(-1, 8, -1), 1));

    EndCityPieces.recursiveChildren(0, 1, v1, new BlockPos(0, 0, 0), pieces, random);
  }

  static createPiece(name, direction, fatherNode, offset, a) {
    var result = new EndCityPiece(name, direction, fatherNode.blockPos, a)
      , a = LegacyStructureSettings.LegacyStructureTemplate.calculateConnectedPosition(
        fatherNode.settings,
        offset,
        result.settings,
        new BlockPos(0, 0, 0)
      );

    result.moveBoundingBox(a);

    return result
  }

  static recursiveChildren(generatorType, generatedLevel, fatherNode, blockPos, pieces, random) {

  }
}

class EndCityPiece extends TemplateStructurePiece {
  constructor(name, direction, blockPos, a) {
    super(a);
    this.name = name;
    this.direction = direction;
    this.loadAndSetup(blockPos);
  }

  loadAndSetup(blockPos) {
    var template = Templates[this.name];
    var settings = new LegacyStructureSettings();
    settings.rotation = this.direction;

    this.setup(template, settings, blockPos);
  }
}

function FatTowerGenerator() {

}

function TowerGenerator() {

}

function TowerBridgeGenerator() {

}

function HouseTowerGenerator() {

}

module.exports = EndCityFeature;