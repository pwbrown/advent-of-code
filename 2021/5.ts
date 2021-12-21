import { getInput } from './utils';

interface Line {
  [ key: string ]: number;
}

const ventLines = getInput(5)
  .split('\n')
  .map(l => l.split(' -> '))
  .map(points => points.reduce<Line>((p, c, i) => {
    const coords = c.split(',').map(n => parseInt(n));
    p[`x${i + 1}`] = coords[0];
    p[`y${i + 1}`] = coords[1];
    return p;
  }, {}))

const countOverlaps = (lines: Line[]) => {
  /** Keep track of each point that a line touches */
  const points: { [key: string]: number } = {};

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
}

const horizontalAndVerticalLines = ventLines.filter(l => l.x1 === l.x2 || l.y1 === l.y2);

console.log(`Part 1: ${countOverlaps(horizontalAndVerticalLines)}`);
console.log(`Part 2: ${countOverlaps(ventLines)}`);