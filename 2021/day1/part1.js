/**
 * 2021-12-01 Part 1: Measure number of depth increases
 */
const { readDepths, countIncreases } = require('./shared');

readDepths().then(depths => {
  console.log(`Total Increases: ${countIncreases(depths)}`);
});