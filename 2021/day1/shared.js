const { readLines } = require('../utils');

/** Read depth measurements from the depth file into an array of integers */
exports.readDepths = () => readLines('depths.txt', ['num']);

/** Count number of increases in an array of integers */
exports.countIncreases = arr => arr.reduce((p, c, i, a) => {
  if (i === 0) return p;
  if (c > a[i - 1]) p += 1;
  return p;
}, 0);