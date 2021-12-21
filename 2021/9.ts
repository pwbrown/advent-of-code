import { getInput, around } from './utils';

type HeightMap = number[][];

type LowPoint = {
  r: number;
  c: number;
}

const getLowPoints = (heightMap: HeightMap) => {
  let lowPoints: LowPoint[] = [];
  for (let r = 0; r < heightMap.length; r += 1) {
    for (let c = 0; c < heightMap[0].length; c += 1) {
      const point = heightMap[r][c];
      const smaller = around(heightMap, r, c)
        .filter(({ val }) => val <= point);
      if (smaller.length === 0) {
        lowPoints.push({ r, c });
      }
    }
  }

  return lowPoints;
}

const getBasinSize = (hm: HeightMap, { r, c }: LowPoint, points: LowPoint[] =[]) => {
  const point = hm[r][c];
  if (point === 9)
    return 0;
  /** Include point if not already in basin (it's possible for recursive overlap) */
  if (!points.find(p => p.r === r && p.c === c))
    points.push({ r, c });
  /** Up */
  if (r !== 0 && hm[r-1][c] > point)
    getBasinSize(hm, { r: r - 1, c }, points);
  /** Down */
  if (r !== hm.length - 1 && hm[r + 1][c] > point)
    getBasinSize(hm, { r: r + 1, c }, points);
  /** Left */
  if (c !== 0 && hm[r][c-1] > point)
    getBasinSize(hm, { r, c: c -1 }, points);
  /** Right */
  if (c !== hm[0].length && hm[r][c+1] > point)
    getBasinSize(hm, { r, c: c + 1 }, points);
  return points.length;
};


const heightMap = getInput(9)
  .split('\n')
  .map(line => line.split('').map(n => parseInt(n)));

const lowPoints= getLowPoints(heightMap);

const risk = lowPoints
  .reduce((p, c) => {
    const risk = heightMap[c.r][c.c] + 1;
    return p + risk;
  }, 0)

const basins = lowPoints
  .map(low => getBasinSize(heightMap, low));

const topBasinRisk = basins
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((p, c) => p * c);

console.log(`Part 1: ${risk}`);
console.log(`Part 2: ${topBasinRisk}`);
