


v4 = packedPos;
// XXXXZZZZYYYY;
v11 = palette.length & 0xF;
// arr: Int32Array
// v4 & 0B111 = YYY
arr[4 * (v4 >> 3) + 8] = arr[4 * (v4 >> 3) + 8] & ~(0B1111 << (4 * (v4 & 7))) | (v11 << (4 * (v4 & 7)));