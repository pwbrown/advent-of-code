/**
 * 2021-12-05 Part 2
 */
 const { getVentLines, countOverlaps } = require('./shared');

 getVentLines().then(lines => {
   console.log(`Answer: ${countOverlaps(lines)}`);
 });