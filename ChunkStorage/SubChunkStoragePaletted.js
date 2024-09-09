class SubChunkStorage {
  constructor() {
    // In vanilla code, here only can be 0, 1, 2, 3, 4, 5, 6, 8, 16
    // 0 for subchunks only have single type of block
    this.bitsPerElement = 0;
    this.data = new Uint16Array(Math.ceil(4096 * bitsPerElement / 16));
    this.paletteMaxLength = 2 ** bitsPerElement;
    // Array of Block object
    this.palette = [];
  }

  setBlock(block, posInChunk) {
    var eleIndex = (((posInChunk.x & 0xF) * 0xF) + posInChunk.z & 0xF) * 0xF + posInChunk.y & 0xF;
    for (var e of this.palette) {
      if (e == block) {
        
        return;
      }
    }


  }
}

class SubChunkStoragePaletted {
  constructor(bitsPerElement) {
    if (typeof bitsPerElement != 'number')
      throw new TypeError();
    // In vanilla code, here only can be 0, 1, 2, 3, 4, 5, 6, 8, 16
    // 0 for subchunks only have single type of block
    bitsPerElement = bitsPerElement | 0xF;
    this.data = new Uint8Array(Math.ceil(4096 * bitsPerElement / 8));
    this.paletteMaxLength = 2 ** bitsPerElement;
    // Array of Block object
    this.palette = [];
  }

  setElement() { }

  replaceBlocks() { }
}

module.exports = SubChunkStoragePaletted;