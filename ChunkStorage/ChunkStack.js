class ChunkStack {
  constructor() {
    this.data = {};
  }

  get(chunkPos) {
    return this.data[chunkPos]
  }

  set(chunkPos, chunk) {
    this.data[chunkPos] = chunk;
  }
}

exports.ChunkStack = ChunkStack;