/**
 * 2021-12-09 Part 1
 */
const { getHeightMap, getLowPoints } = require('./shared');

getHeightMap().then(heightMap => {
  const risk = getLowPoints(heightMap)
    .reduce((p, c) => {
      const risk = heightMap[c.r][c.c] + 1;
      return p + risk;
    }, 0)

  console.log(`Answer: ${risk}`);
});