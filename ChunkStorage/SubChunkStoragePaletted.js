class SubChunkStoragePaletted {
  constructor(placeholder) {
    // In vanilla code, here only can be 0, 1, 2, 3, 4, 5, 6, 8, 16
    // 0 for subchunks only have single type of block
    this.bitsPerElement = 0;
    this.data = new Uint16Array(Math.ceil(4096 * this.bitsPerElement / 16));
    this.paletteMaxLength = 2 ** this.bitsPerElement;
    // Array of Block object
    this.palette = [placeholder];
  }

  setBlock(block, posInChunk) {
    var eleIndex = (((posInChunk.x & 0xF) * 0xF) + posInChunk.z & 0xF) * 0xF + posInChunk.y & 0xF
      , wordIndex = Math.floor(eleIndex * this.bitsPerElement / 16)
      , inWord = eleIndex * this.bitsPerElement % 16
      , inNextWord = 16 - inWord
      , i = 0;
    for (var e of this.palette) {
      if (e == block) {
        this.data[wordIndex] = (this.data[wordIndex] & (0xFFFF >> inWord)) | (i >> inWord);
        inNextWord < 16 && (this.data[wordIndex + 1] = (this.data[wordIndex + 1] & (0xFFFF << inNextWord)) | ((i << inNextWord) & 0xFFFF));
        return;
      }
      i++;
    }

    if (this.palette.length >= this.paletteMaxLength)
      this.makeExpand();

    this.palette.push(block);
    this.data[wordIndex] = (this.data[wordIndex] & (0xFFFF >> inWord)) | (i >> inWord);
    inNextWord < 16 && (this.data[wordIndex + 1] = (this.data[wordIndex + 1] & (0xFFFF << inNextWord)) | ((i << inNextWord) & 0xFFFF));
  }

  makeExpand() {
    var dataPrev = this.data;
    if (this.bitsPerElement < 8 && this.bitsPerElement >= 0)
      this.bitsPerElement += 1;
    else if (this.bitsPerElement == 8)
      this.bitsPerElement = 16;
    else throw new Error()
  }
}

module.exports = SubChunkStoragePaletted;