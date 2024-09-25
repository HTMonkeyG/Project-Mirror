class BlockVolume {
  constructor(xL, yL, zL, placeholder, minHeight) {
    this.xL = xL > 0 ? xL | 0 : 1;
    this.yL = yL > 0 ? yL | 0 : 1;
    this.zL = zL > 0 ? zL | 0 : 1;
    this.placeholder = placeholder;
    this.minHeight = minHeight;
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

  getAboveTopSolidBlock(blockPos, a, b, c) {
    if (blockPos.x < 0 || blockPos.x >= this.xL)
      return false;
    if (blockPos.y < 0 || blockPos.y >= this.yL)
      return false;
    if (blockPos.z < 0 || blockPos.z >= this.zL)
      return false;

    for (var yP = blockPos.y < yL - 1 ? yL - 1 : blockPos.y, v13; yP > 0; yP--) {
      v13 = this.data[yP + this.yL * (blockPos.z + this.zL * blockPos.x)];
      /*if (!v13)
        break;
      v14 = * (v13 + 33);
      if (v14) {
        if (!Material:: isTopSolid(v14, a4, a5) )
            goto LABEL_17;
        yL = this -> yL;
      }*/
      /*if (!v13.isTopSolid(a4, a5))
        break;*/
      if (v13 == "air") break;
    }

    var v16 = yP + 1;
    if (yP + 1 < 0)
      v16 = 0;
    return this.minHeight + v16;
  }
}

module.exports = BlockVolume;