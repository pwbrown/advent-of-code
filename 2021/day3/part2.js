/**
 * 2021-12-03 Part 2
 */
const { readDiagnosticReport, calculateGammaEpsilonBinary } = require('./shared');

const filterByMask = (records, maskFunc, i = 0) => {
  const mask = maskFunc(records);
  if (records.length === 0) throw Error('Filtered to 0!');
  if (records.length < 2 || i === mask.length)
    return records[0];
  records = records.filter(r => r[i] === mask[i]);
  return filterByMask(records, maskFunc, i + 1);
}

readDiagnosticReport().then(records => {
  let oxygen = filterByMask(
    [...records],
    (recs) => calculateGammaEpsilonBinary(recs).gamma,
  );
  let co2 = filterByMask(
    [...records],
    (recs) => calculateGammaEpsilonBinary(recs).epsilon,  
  );
  
  oxygen = parseInt(oxygen, 2);
  co2 = parseInt(co2, 2);

  console.log(`Answer: ${oxygen * co2}`);
});