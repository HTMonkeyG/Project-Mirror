class Dimension {
  constructor () {
    this.minHeight = 0;
    this.maxHeight = 255;
  }

  getMinHeight() {
    return this.minHeight;
  }

  getMaxHeight() {
    return this.maxHeight;
  }

  getHeightRange() {
    return {
      min: this.minHeight,
      max: this.maxHeight,
      height: this.maxHeight - this.minHeight
    }
  }
}