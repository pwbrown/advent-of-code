/**
 * 2021-12-08 Part 2
 */
const { getSignalPatterns } = require('./shared');

const filterByLength = (arr, length) => arr.filter(a => a.length === length);

const filterOutSegments = (str, toFilterOut) =>
  str
    .split('')
    .filter(a => !toFilterOut.includes(a))
    .join('');

const decodePatterns = (patterns) => {
  const decoded = {}
  /** Find digit 1 by looking for pattern with 2 segments */
  const d1 = filterByLength(patterns, 2)[0];
  decoded[d1] = 1;
  /** Find digit 7 by looking for pattern with 3 segments  */
  const d7 = filterByLength(patterns, 3)[0];
  decoded[d7] = 7;
  /** Find digit 4 by looking for pattern with 4 segments */
  const d4 = filterByLength(patterns, 4)[0];
  decoded[d4] = 4;
  /** Find digit 8 by looking for pattern with 7 segments */
  const d8 = filterByLength(patterns, 7)[0];
  decoded[d8] = 8;
  /**
   * Find digit 3 by filtering out the segments of digit 1
   * from all 5 segment patterns. The pattern with 3 segments
   * left over is digit 3
   */
  let fiveSeg = filterByLength(patterns, 5);
  const d3 = fiveSeg.filter(p => filterOutSegments(p, d1).length === 3)[0];
  decoded[d3] = 3;
  fiveSeg = fiveSeg.filter(p => p !== d3);
  /**
   * Find digit 9 by filtering out the segments of digit 3
   * from all 6 segment patterns. The pattern with 1 segment
   * left over is digit 9
   */
  let sixSeg = filterByLength(patterns, 6);
  const d9 = sixSeg.filter(p => filterOutSegments(p, d3).length === 1)[0];
  decoded[d9] = 9;
  sixSeg = sixSeg.filter(p => p !== d9);
  /**
   * Find digit 2 by filtering out the segments of digit 9
   * from all five segment patterns. The pattern with 1 segment
   * left over is digit 2
   */
  const d2 = fiveSeg.filter(p => filterOutSegments(p, d9).length === 1)[0];
  decoded[d2] = 2;
  /** Digit 5 is the only remaining digit in the five segments list */
  const d5 = fiveSeg.filter(p => p !== d2)[0];
  decoded[d5] = 5;
  /**
   * Find digit 6 by filtering out the segments of digit 5
   * from all six segment patterns. The pattern with 1 segment
   * left over is digit 6
   */
  const d6 = sixSeg.filter(p => filterOutSegments(p, d5).length === 1)[0];
  decoded[d6] = 6;
  /** Digit 0 is the only remaining digit in the six segments list */
  const d0 = sixSeg.filter(p => p !== d6)[0];
  decoded[d0] = 0;
  
  return decoded;
}

getSignalPatterns().then(signals => {
  const sum = signals.reduce((p, c) => {
    const decoded = decodePatterns(c.patterns);
    const outputStr = c.outputs.map(o => decoded[o]).join('');
    return p + parseInt(outputStr, 10);
  }, 0);
  
  console.log(`Answer: ${sum}`);
});