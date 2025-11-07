import { BlockPos } from "./Structs";

export declare class BlockPosIterator {
  constructor(min: BlockPos, max: BlockPos);

  min: BlockPos;
  max: BlockPos;
  readonly current: BlockPos;
  readonly done: boolean;

  next(): { value: BlockPos, done: boolean };

  [Symbol.iterator](): BlockPosIterator;
}