import { BlockPos } from "../Structs";

export declare class BlockVolume {
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

  readonly xL: number;
  readonly yL: number;
  readonly zL: number;
  readonly placeholder: object;
  readonly minHeight: number;
  readonly maxIndex; number;
  readonly data: object[];

  index(pos: BlockPos): number;
  getIndexBounds(): number;
  getAboveTopSolidBlock(blockPos: BlockPos, a: number, b: number, c: number): number;
  findHighestNonAirBlock(): void;
}