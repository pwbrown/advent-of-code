const { readFileSync } = require('fs');
const { join } = require('path');

exports.getInitialPositions = () =>
  readFileSync(join(__dirname, '../data/crab-subs.txt'), { encoding: 'utf8' })
    .split(',')
    .map(s => parseInt(s, 10))
    .sort();

exports.getMinFuel = (positions, calculateFuel) => {
  let minFuel = Infinity;
  
  for (let i = positions[0]; i <= positions[positions.length - 1]; i += 1) {
    let fuel = positions.reduce((p, c) => p + calculateFuel(c, i), 0);
    if (fuel < minFuel)
      minFuel = fuel;
  }

  return minFuel;
};