/**
 * 2021-12-04 Part 2
 */
 const { getVentLines, countOverlaps } = require('./shared');

 getVentLines().then(lines => {
   console.log(`Answer: ${countOverlaps(lines)}`);
 });