const { BlockPos } = require("./Structs.js");

class BlockPosIterator {
  constructor(min, max) {
    this.min = new BlockPos(
      Math.min(min.x, max.x),
      Math.min(min.y, max.y),
      Math.min(min.z, max.z),
    );
    this.max = new BlockPos(
      Math.max(min.x, max.x),
      Math.max(min.y, max.y),
      Math.max(min.z, max.z),
    );
    this.current = BlockPos.copy(this.min);
    this.done = false;
  }

  next() {
    if (this.current.z >= this.max.z) {
      if (this.current.y >= this.max.y) {
        if (this.current.x >= this.max.x)
          this.done = 1;
        else {
          this.current.z = this.min.z;
          this.current.y = this.min.y;
          this.current.x++;
        }
      } else {
        this.current.z = this.min.z;
        this.current.y++;
      }
    } else
      this.current.z++;

    return {
      value: this.current,
      done: this.done
    }
  }

  [Symbol.iterator]() {
    return new BlockPosIterator(this.min, this.max);
  }
}

module.exports = BlockPosIterator;