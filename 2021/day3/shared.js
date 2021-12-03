const { readLines } = require('../utils');

/**
 * Reads the diagnostic report as an array of binary strings
 */
exports.readDiagnosticReport = () => readLines('diagnostic-report.txt');

/**
 * Calculates the gamma (most common digits) and epsilon (least common digits)
 * as binary string representations
 */
exports.calculateGammaEpsilonBinary = (records) => {
  let gamma = '';
  let epsilon = '';
  /** Iterate through digits in binary value */
  const len = records[0].length;
  for (let i = 0; i < len; i += 1) {
    let mc = 0;
    records.forEach(rec => {
      if (rec[i] === '1') mc += 1;
      else mc -= 1;
    });
    gamma += mc >= 0 ? '1' : '0';
    epsilon += mc >= 0 ? '0' : '1';
  }
  return { gamma, epsilon };
}