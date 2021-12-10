const { readLines } = require('../utils');

exports.getHeightMap = () =>
  readLines('height-map.txt').then(lines =>
    lines.map(line =>
      line
        .split('')
        .map(n => parseInt(n, 10)),
    ),
  );

exports.getLowPoints = (heightMap) => {
  const w = heightMap[0].length;
  const h = heightMap.length;
  
  let lowPoints = [];
  for (let r = 0; r < h; r += 1) {
    const touchesTop = r === 0; 
    const touchesBottom = r === h - 1;
    for (let c = 0; c < w; c += 1) {
      const point = heightMap[r][c];
      const up = !touchesTop ? heightMap[r-1][c] : 10;
      const down = !touchesBottom ? heightMap[r+1][c] : 10;
      const left = c !== 0 ? heightMap[r][c-1] : 10;
      const right = c !== w - 1 ? heightMap[r][c+1] : 10;
      if (point < up && point < down && point < left && point < right) {
        lowPoints.push({ r, c })
      }
    }
  }

  return lowPoints;
}
