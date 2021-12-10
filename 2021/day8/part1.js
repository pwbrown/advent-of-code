/**
 * 2021-12-08 Part 1
 */
const { getSignalPatterns } = require('./shared');

getSignalPatterns().then(signals => {
  /** 1 to 1 lengths to map to 1, 4, 7, 8 outputs respectively */
  const validLengths = [2, 4, 3, 7];
  /** Add up all output digits that are one of the above lengths of characters */
  const occurences = signals
    .reduce(
      (p, c) =>
        p + c.outputs.filter(o => validLengths.includes(o.length)).length,
      0,
    );
  
  console.log(`Answer: ${occurences}`);
});
