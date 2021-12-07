/**
 * 2021-12-05 Part 1
 */
const { getVentLines, countOverlaps } = require('./shared');

getVentLines().then(lines => {
  /** Only considering vertical or horizontal lines in part 1 */
  lines = lines.filter(l => l.x1 === l.x2 || l.y1 === l.y2);

  console.log(`Answer: ${countOverlaps(lines)}`);
});