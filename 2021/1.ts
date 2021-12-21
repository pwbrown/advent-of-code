import { getInput } from './utils';

const countIncreases = (arr: number[]) => arr.reduce<number>((p, c, i, a) => {
  if (i !== 0 && c > a[i-1]) {
    p += 1;
  }
  return p;
}, 0);

const depths = getInput(1).split('\n').map(n => parseInt(n));

const windows: number[][] = [];
depths.forEach((depth, i) => {
  /** Create new window */
  windows.push([depth]);
  /** Add to previous 2 windows */
  for (let p = i - 1; p >= Math.max(0, i - 2); p -= 1) {
    windows[p].push(depth);
  }
});
/** Sum values in windows of at least 3 depths */
const windowSums = windows
  .filter(w => w.length === 3)
  .map(w => w.reduce((p, c) => p + c, 0));

console.log(`Part 1: ${countIncreases(depths)}`);
console.log(`Part 2: ${countIncreases(windowSums)}`);