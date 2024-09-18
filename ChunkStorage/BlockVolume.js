class BlockVolume {
  constructor(xL, yL, zL, placeholder) {
    this.xL = xL > 0 ? xL | 0 : 1;
    this.yL = yL > 0 ? yL | 0 : 1;
    this.zL = zL > 0 ? zL | 0 : 1;
    this.placeholder = placeholder;
    this.maxIndex = this.xL * this.yL * this.zL;
    this.data = [];
    if (placeholder)
      for (var i = 0; i < this.maxIndex; i++)
        this.data[i] = placeholder;
  }

  index(pos) {
    var index = pos.y + this.yL * (pos.z + this.zL * pos.x);
    if (index < this.maxIndex)
      return index;
    else
      throw new RangeError("Invalid block pos")
  }

  getIndexBounds() { return this.maxIndex }
}

module.exports = BlockVolume;