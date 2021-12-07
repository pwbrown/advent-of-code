const { readLines } = require('../utils');

/**
 * Get vent line point coordinates
 */
exports.getVentLines = () => readLines('vent-lines.txt')
  .then(lines => lines
    .map(l => l.split(' -> ')) // Split each line into an array of points
    .map(points => points.reduce((p, c, i) => { // Convert points into object of { x1, y1, x2, y2 }
      const coords = c.split(',').map(n => parseInt(n, 10));
      p[`x${i + 1}`] = coords[0];
      p[`y${i + 1}`] = coords[1];
      return p;
    }, {})),
  );


exports.countOverlaps = (lines) => {
  /** Keep track of each point that a line touches */
  const points = {};

  let overlaps = 0;
  /** Draw each line on the grid and count the number of overlaps */
  lines.forEach(l => {
    const xUp = l.x1 <= l.x2;
    const yUp = l.y1 <= l.y2;
    let x = l.x1;
    let y = l.y1;

    while(true) {
      /** Increment current point */
      const coord = `${x},${y}`;
      points[coord] = (points[coord] || 0) + 1;
      /** Increment overlaps if point is 2 */
      if (points[coord] === 2) {
        overlaps += 1;
      }
      /** Check if end of line is reached */
      if (x === l.x2 && y === l.y2) break;
      /** Adjust x */
      if (x !== l.x2) {
        x += xUp ? 1 : -1;
      }
      if (y !== l.y2) {
        y += yUp ? 1 : -1;
      }
    }
  });
  
  return overlaps;
};