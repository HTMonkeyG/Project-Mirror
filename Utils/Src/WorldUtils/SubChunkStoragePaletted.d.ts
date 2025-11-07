import { ChunkBlockPos } from "../Structs";

export declare class SubChunkStoragePaletted {
  constructor(placeholder: any);

  /**
   * In vanilla code, here only can be 0, 1, 2, 3, 4, 5, 6, 8, 16
   * 0 for subchunks only have single type of block.
   */
  readonly bitsPerElement: number;
  readonly data: Uint16Array;
  readonly paletteMaxLength: number;
  /** Array of Block object. */
  readonly palette: any[];

  setBlock(block: any, posInChunk: ChunkBlockPos): void;
  makeExpand(): void;
}