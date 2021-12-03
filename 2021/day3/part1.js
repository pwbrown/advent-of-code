/**
 * 2021-12-03 Part 1
 */
const { readDiagnosticReport, calculateGammaEpsilonBinary } = require('./shared');

readDiagnosticReport().then(records => {
  let { gamma, epsilon } = calculateGammaEpsilonBinary(records);

  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  console.log(`Answer: ${gamma * epsilon}`);
});