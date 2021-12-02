/**
 * 2021-12-01 Part 1: Measure number of depth increases
 */
const { readDepthsToArray, countIncreases } = require('./utils');

readDepthsToArray().then(depths => {
  console.log(`Total Increases: ${countIncreases(depths)}`);
});