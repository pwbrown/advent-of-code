/**
 * 2021-12-08 Part 2
 */
const { getHeightMap, getLowPoints } = require('./shared');

const getBasinSize = (hm, { r, c }, points = []) => {
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

getHeightMap().then(heightMap => {
  const basins = getLowPoints(heightMap)
    .map(low => getBasinSize(heightMap, low));

  /** Multiply together the largest 3 basin sizes */
  const risk = basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((p, c) => p * c);

  console.log(`Answer: ${risk}`);
});
