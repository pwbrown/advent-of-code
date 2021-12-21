import { getInput } from './utils';

/**
 * Calculates the gamma (most common digits) and epsilon (least common digits)
 * as binary string representations
 */
const calculateGammaEpsilonBinary = (records: string[]) => {
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

const filterByMask = (
  records: string[],
  maskFunc: (recs: string[]) => string,
  i = 0,
): string => {
  const mask = maskFunc(records);
  if (records.length === 0) throw Error('Filtered to 0!');
  if (records.length < 2 || i === mask.length)
    return records[0];
  records = records.filter(r => r[i] === mask[i]);
  return filterByMask(records, maskFunc, i + 1);
}

const reports = getInput(3).split('\n');

const { gamma, epsilon } = calculateGammaEpsilonBinary(reports);

const gammaInt = parseInt(gamma, 2);
const epsilonInt = parseInt(epsilon, 2);

console.log(`Part 1: ${gammaInt * epsilonInt}`);

const oxygen = filterByMask(
  [...reports],
  (recs) => calculateGammaEpsilonBinary(recs).gamma,
);
const co2 = filterByMask(
  [...reports],
  (recs) => calculateGammaEpsilonBinary(recs).epsilon,
);

const oxygenInt = parseInt(oxygen, 2);
const co2Int = parseInt(co2, 2);

console.log(`Part 2: ${oxygenInt * co2Int}`);