// ----------------------------------------------------------------------------
// A completely accurate generator for end cities.
// ----------------------------------------------------------------------------

const {
  BlockVolume,
  MT,
  BlockPos,
  AABB,
  RotationUtils
} = require("project-mirror-utils");
const { TheEndGenerator } = require("../WorldGenerator/TheEndGenerator.js");
const { StructureFeature } = require("./StructureFeature.js");
const { StructurePiece } = require("./StructurePiece.js");
const { TemplateStructurePiece } = require("./TemplateStructurePiece.js");
const { LegacyStructureTemplate, LegacyStructureSettings } = require("./LegacyStructureSettings.js");
const { StructureStart } = require("./StructureStart.js");

function nullTemplateCreate(x, y, z) {
  var result = new LegacyStructureTemplate();
  result.size.x = x;
  result.size.y = y;
  result.size.z = z;
  return result;
}

const EndCityTemplates = {
  base_floor: nullTemplateCreate(10, 4, 10),
  base_roof: nullTemplateCreate(12, 2, 12),
  bridge_end: nullTemplateCreate(5, 6, 2),
  bridge_gentle_stairs: nullTemplateCreate(5, 7, 8),
  bridge_piece: nullTemplateCreate(5, 6, 4),
  bridge_steep_stairs: nullTemplateCreate(5, 7, 4),
  fat_tower_base: nullTemplateCreate(13, 4, 13),
  fat_tower_middle: nullTemplateCreate(13, 8, 13),
  fat_tower_top: nullTemplateCreate(17, 6, 17),
  second_floor: nullTemplateCreate(12, 8, 12),
  second_floor_2: nullTemplateCreate(12, 8, 12),
  second_roof: nullTemplateCreate(14, 2, 14),
  ship: nullTemplateCreate(13, 24, 29),
  third_floor: nullTemplateCreate(14, 8, 14),
  third_floor_b: nullTemplateCreate(14, 8, 14), // Unused.
  third_floor_c: nullTemplateCreate(14, 8, 14),
  third_roof: nullTemplateCreate(16, 2, 16),
  tower_base: nullTemplateCreate(7, 7, 7),
  tower_floor: nullTemplateCreate(7, 4, 7), // Unused.
  tower_piece: nullTemplateCreate(7, 4, 7),
  tower_top: nullTemplateCreate(9, 5, 9)
};

const GeneratorTypes = {
  TOWER_GENERATOR: 0,
  FAT_TOWER_GENERATOR: 1,
  TOWER_BRIDGE_GENERATOR: 2,
  HOUSE_TOWER_GENERATOR: 3
};

class TowerGenerator {
  generate(generators, generatedLevel, fatherNode, blockPos, localPieces, random) {
    if (!fatherNode)
      return false;

    var direction = fatherNode.direction
      , baseOffsetX = random.nextInt(2) + 3
      , baseOffsetZ = random.nextInt(2) + 3;

    var towerBase = EndCityPieces._createPiece(
      "tower_base",
      direction,
      fatherNode,
      new BlockPos(baseOffsetX, -3, baseOffsetZ),
      1
    );
    EndCityPieces._addHelper(towerBase, localPieces);

    var currentTower = EndCityPieces._createPiece(
      "tower_piece",
      direction,
      towerBase,
      new BlockPos(0, 7, 0),
      1
    );
    EndCityPieces._addHelper(currentTower, localPieces);

    var hasBridges = random.nextInt(3) === 0
      , towerHeight = random.nextInt(3) + 1
      , bridgeAnchor = void 0;

    // Is it allowed to have a bridge in the tower.
    if (hasBridges)
      // Record the tower segment connected to the bridge.
      bridgeAnchor = currentTower;

    for (var i = 0; i < towerHeight; i++) {
      currentTower = EndCityPieces._createPiece(
        "tower_piece",
        direction,
        currentTower,
        new BlockPos(0, 4, 0),
        1
      );
      EndCityPieces._addHelper(currentTower, localPieces);

      if (i < towerHeight - 1 && random.nextBoolean())
        // Create bridges on current tower segment.
        bridgeAnchor = currentTower;
    }

    var lastTowerSegment = currentTower;

    if (bridgeAnchor) {
      const bridgeConfigs = [
        { rotation: 0, offset: { x: 1, y: 0, z: 0 } },
        { rotation: 1, offset: { x: 0, y: 0, z: 1 } },
        { rotation: 2, offset: { x: -1, y: 0, z: 0 } },
        { rotation: 3, offset: { x: 0, y: 0, z: -1 } }
      ];

      for (const config of bridgeConfigs) {
        if (random.nextBoolean()) {
          // If we want a bridge.
          var bridgeRotation = RotationUtils.getRotated(direction, config.rotation);

          // Generate the connnector of the bridge.
          var bridgeEnd = EndCityPieces._createPiece(
            "bridge_end",
            bridgeRotation,
            bridgeAnchor,
            config.offset,
            1
          );
          EndCityPieces._addHelper(bridgeEnd, localPieces);

          // Generate the bridge.
          EndCityPieces._recursiveChildren(
            generators,
            GeneratorTypes.TOWER_BRIDGE_GENERATOR,
            generatedLevel + 1,
            bridgeEnd,
            new BlockPos(0, 0, 0),
            localPieces,
            random
          );
        }
      }

      // Generate tower top.
      var towerTop = EndCityPieces._createPiece(
        "tower_top",
        direction,
        lastTowerSegment,
        new BlockPos(-1, 4, -1),
        1
      );
      EndCityPieces._addHelper(towerTop, localPieces);
    }

    if (generatedLevel == 7) {
      // If we reached the max level, then return directly.
      var towerTop = EndCityPieces._createPiece(
        "tower_top",
        direction,
        lastTowerSegment,
        new BlockPos(-1, 4, -1),
        1
      );
      EndCityPieces._addHelper(towerTop, localPieces);
      return true;
    }

    // Or try to generate fat tower recursively.
    return EndCityPieces._recursiveChildren(
      generators,
      GeneratorTypes.FAT_TOWER_GENERATOR,
      generatedLevel + 1,
      lastTowerSegment,
      new BlockPos(0, 0, 0),
      localPieces,
      random
    );
  }
}

class FatTowerGenerator {
  generate(generators, generatedLevel, fatherNode, blockPos, localPieces, random) {
    if (!fatherNode)
      return false;

    const fatTowerBridgeConfigs = [
      { rotation: 0, offset: { x: 4, y: 0, z: 0 } },
      { rotation: 1, offset: { x: 0, y: 0, z: 4 } },
      { rotation: 2, offset: { x: -4, y: 0, z: 0 } },
      { rotation: 3, offset: { x: 0, y: 0, z: -4 } }
    ];

    var direction = fatherNode.direction;
    var towerBase = EndCityPieces._createPiece(
      "fat_tower_base",
      direction,
      fatherNode,
      new BlockPos(-3, 4, -3),
      1
    );
    EndCityPieces._addHelper(towerBase, localPieces);

    // Generate the firce middle segment.
    var currentTower = EndCityPieces._createPiece(
      "fat_tower_middle",
      direction,
      towerBase,
      new BlockPos(0, 4, 0),
      1
    );
    currentTower = EndCityPieces._addHelper(currentTower, localPieces);

    // Generate more middle segments.
    for (let i = 0; i < 2; i++) {
      if (random.nextInt(3) === 0)
        break;

      var middlePiece = EndCityPieces._createPiece(
        "fat_tower_middle",
        direction,
        currentTower,
        new BlockPos(0, 8, 0),
        1
      );
      currentTower = EndCityPieces._addHelper(middlePiece, localPieces);

      // Try generate bridges on every middle segment.
      for (const config of fatTowerBridgeConfigs) {
        if (random.nextBoolean()) {
          var bridgeRotation = RotationUtils.getRotated(direction, config.rotation);

          // Generate the connector of the bridge.
          var bridgeEnd = EndCityPieces._createPiece(
            "bridge_end",
            bridgeRotation,
            currentTower,
            config.offset,
            1
          );
          EndCityPieces._addHelper(bridgeEnd, localPieces);

          // Generate the bridge.
          EndCityPieces._recursiveChildren(
            generators,
            GeneratorTypes.TOWER_BRIDGE_GENERATOR,
            generatedLevel + 1,
            bridgeEnd,
            new BlockPos(0, 0, 0),
            localPieces,
            random
          );
        }
      }
    }

    // Generate the top of the tower.
    var fatTop = EndCityPieces._createPiece(
      "fat_tower_top",
      direction,
      currentTower,
      new BlockPos(-2, 8, -2),
      1
    );
    EndCityPieces._addHelper(fatTop, localPieces);

    return true;
  }
}

class TowerBridgeGenerator {
  constructor() {
    this.hasShip = false;
  }

  hasShip;

  generate(generators, generatedLevel, fatherNode, blockPos, localPieces, random) {
    if (!fatherNode)
      return false;

    var direction = fatherNode.direction
      , bridgeLength = random.nextInt(4) + 1;

    // Generate the first segment of the bridge. It's always a flat bridge.
    var currentBridge = EndCityPieces._createPiece(
      "bridge_piece",
      direction,
      fatherNode,
      new BlockPos(0, 0, -4),
      1
    );
    EndCityPieces._addHelper(currentBridge, localPieces);
    currentBridge.uid = -1;

    var heightOffset = 0;

    // Generate the bridge.
    for (let i = 0; i < bridgeLength; i++) {
      if (random.nextBoolean()) {
        // Generate a flat bridge.
        var bridgePiece = EndCityPieces._createPiece(
          "bridge_piece",
          direction,
          currentBridge,
          { x: 0, y: heightOffset, z: -4 },
          1
        );
        currentBridge = EndCityPieces._addHelper(bridgePiece, localPieces);
        // Don't change the height.
        heightOffset = 0;
      } else {
        // Generate stairs.
        if (random.nextBoolean()) {
          // Generate steep stairs.
          var steepStairs = EndCityPieces._createPiece(
            "bridge_steep_stairs",
            direction,
            currentBridge,
            { x: 0, y: heightOffset, z: -4 },
            1
          );
          currentBridge = EndCityPieces._addHelper(steepStairs, localPieces);
          // Increse the height.
          heightOffset = 4;
        } else {
          // Generate gentle stairs.
          var gentleStairs = EndCityPieces._createPiece(
            "bridge_gentle_stairs",
            direction,
            currentBridge,
            { x: 0, y: heightOffset, z: -8 },
            1
          );
          currentBridge = EndCityPieces._addHelper(gentleStairs, localPieces);
          // Don't increase the height.
          heightOffset = 0;
        }
      }
    }

    // Determine what structure the bridge endpoint connects to.
    if (!this.hasShip || random.nextInt(10 - generatedLevel)) {
      // Generate tower connected to the bridge.
      return EndCityPieces._recursiveChildren(
        generators,
        GeneratorTypes.HOUSE_TOWER_GENERATOR,
        generatedLevel + 1,
        currentBridge,
        new BlockPos(-3, heightOffset + 1, -11),
        localPieces,
        random
      );
    } else {
      // Generate the end ship.
      var shipX = random.nextInt(8) - 8
        , shipZ = random.nextInt(10) - 70;

      var endShip = EndCityPieces._createPiece(
        "ship",
        direction,
        currentBridge,
        new BlockPos(shipX, heightOffset, shipZ),
        1
      );
      EndCityPieces._addHelper(endShip, localPieces);

      this.hasShip = true;
    }

    // Generate the end of the bridge.
    var bridgeEnd = EndCityPieces._createPiece(
      "bridge_end",
      RotationUtils.getRotated(direction, 2),
      currentBridge,
      { x: 4, y: heightOffset, z: 0 },
      1
    );
    EndCityPieces._addHelper(bridgeEnd, localPieces);
    bridgeEnd.uid = -1;

    return true;
  }
}

class HouseTowerGenerator {
  generate(generators, generatedLevel, fatherNode, blockPos, localPieces, random) {
    var direction = fatherNode.direction
      , prev, height;

    if (generatedLevel > 8 || !fatherNode)
      return false;

    prev = EndCityPieces._addHelper(
      EndCityPieces._createPiece("base_floor", direction, fatherNode, blockPos, 1),
      localPieces
    );

    height = random.nextInt(3);

    switch (height) {
      case 0:
        prev = EndCityPieces._addHelper(
          EndCityPieces._createPiece("base_roof", direction, prev, new BlockPos(-1, 4, -1), 1),
          localPieces
        );
        break;
      case 1:
        prev = EndCityPieces._addHelper(
          EndCityPieces._createPiece("second_floor_2", direction, prev, new BlockPos(-1, 0, -1), 0),
          localPieces
        );
        prev = EndCityPieces._addHelper(
          EndCityPieces._createPiece("second_roof", direction, prev, new BlockPos(-1, 8, -1), 0),
          localPieces
        );
        break;
      case 2:
        prev = EndCityPieces._addHelper(
          EndCityPieces._createPiece("second_floor_2", direction, prev, new BlockPos(-1, 0, -1), 0),
          localPieces
        );
        prev = EndCityPieces._addHelper(
          EndCityPieces._createPiece("third_floor_c", direction, prev, new BlockPos(-1, 4, -1), 0),
          localPieces
        );
        prev = EndCityPieces._addHelper(
          EndCityPieces._createPiece("third_roof", direction, prev, new BlockPos(-1, 8, -1), 1),
          localPieces
        );
        break;
      default:
        return 0;
    }

    return EndCityPieces._recursiveChildren(
      generators,
      GeneratorTypes.TOWER_GENERATOR,
      generatedLevel + 1,
      prev,
      new BlockPos(0, 0, 0),
      localPieces,
      random
    );
  }
}

class EndCityPiece extends TemplateStructurePiece {
  constructor(name, direction, blockPos) {
    super();
    this.name = name;
    this.direction = direction;
    this.uid = 0;
    this._loadAndSetup(blockPos);
  }

  _loadAndSetup(blockPos) {
    var template = EndCityTemplates[this.name];
    var settings = new LegacyStructureSettings();
    settings.rotation = this.direction;

    this._setup(template, settings, blockPos);
  }
}

class EndCityPieces {
  static startHouseTower(blockPos, random, direction, pieces) {
    var generators = [
      new TowerGenerator(),
      new FatTowerGenerator(),
      new TowerBridgeGenerator(),
      new HouseTowerGenerator()
    ];

    var current = new EndCityPiece("base_floor", direction, blockPos, 1);
    EndCityPieces._addHelper(current, pieces);

    current = EndCityPieces._createPiece(
      "second_floor",
      direction,
      current,
      new BlockPos(-1, 0, -1),
      0
    );
    EndCityPieces._addHelper(current, pieces);

    current = EndCityPieces._createPiece(
      "third_floor",
      direction,
      current,
      new BlockPos(-1, 4, -1),
      0
    );
    EndCityPieces._addHelper(current, pieces);

    current = EndCityPieces._createPiece(
      "third_roof",
      direction,
      current,
      new BlockPos(-1, 8, -1),
      1
    );
    current = EndCityPieces._addHelper(current, pieces);

    return EndCityPieces._recursiveChildren(
      generators,
      GeneratorTypes.TOWER_GENERATOR,
      1,
      current,
      new BlockPos(0, 0, 0),
      pieces,
      random
    );
  }

  static _createPiece(name, direction, fatherNode, offset, a) {
    var result = new EndCityPiece(name, direction, fatherNode.origin, a)
      , conn = LegacyStructureTemplate.calculateConnectedPosition(
        fatherNode.settings,
        offset,
        result.settings,
        new BlockPos(0, 0, 0)
      );

    result.moveBoundingBox(conn.x, conn.y, conn.z);

    return result
  }

  static _addHelper(piece, pieces) {
    pieces.push(piece);
    return piece;
  }

  static _recursiveChildren(generators, generatorType, generatedLevel, fatherNode, blockPos, pieces, random) {
    var localPieces = []
      , uid;

    if (generatedLevel > 8 || !fatherNode)
      return false;
    if (!generators[generatorType].generate(generators, generatedLevel, fatherNode, blockPos, localPieces, random))
      return false;

    // Generate uid for current batch of nodes. We allow nodes within the same
    // batch to collide with each other.
    uid = random.nextInt();

    for (var element of localPieces) {
      element.uid = uid;
      var collide = StructurePiece.findCollisionPiece(pieces, element.boundingBox);
      if (collide && collide.uid != fatherNode.uid)
        // Dismiss the entire branch when it collides with existing pieces.
        return false;
    }

    // This method directly changes the input array.
    for (var element of localPieces)
      pieces.push(element);

    return true;
  }
}

var r = [], s = new MT(0xEF5D4792);
s.nextInt();
s.nextInt();
s.nextInt();
s.nextInt();
console.log(EndCityPieces.startHouseTower(new BlockPos(-552, 63, 1352), s, 0, r));
console.log(r)

class EndCityStart extends StructureStart {
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
    super(chunkPos);

    var a = new MT((chunkPos.x + 10387313 * chunkPos.z) | 0)
      , direction = a.nextIntRaw() & 3
      , initialY = EndCityStart.getYPositionForFeature(chunkPos, dimension);

    if (initialY >= 60) {
      EndCityPieces.startHouseTower(
        new BlockPos(16 * chunkPos.x + 8, initialY, 16 * chunkPos.z + 8),
        random,
        direction,
        this.pieces
      );
      this.calculateBoundingBox();
      this.success = true;
    } else
      this.success = false;
  }

  success;
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

module.exports = {
  EndCityFeature
};