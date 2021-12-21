import { getInput } from './utils';

const getMinFuel = (
  positions: number[],
  calculateFuel: (pos: number, target: number) => number,
) => {
  let minFuel = Infinity;
  
  for (let i = positions[0]; i <= positions[positions.length - 1]; i += 1) {
    let fuel = positions.reduce((p, c) => p + calculateFuel(c, i), 0);
    if (fuel < minFuel)
      minFuel = fuel;
  }

  return minFuel;
};

const positions = getInput(7)
.split(',')
.map(n => parseInt(n))
.sort();

const part1MinFuel = getMinFuel(positions, (pos, target) => Math.abs(pos - target));
console.log(`Part 1: ${part1MinFuel}`);

const part2MinFuel = getMinFuel(positions, (pos, target) => {
  const steps = Math.abs(pos - target);
  let fuel = 0;
  for (let i = 0; i < steps; i += 1) {
    fuel += (i + 1);
  }
  return fuel;
});
console.log(`Part 2: ${part2MinFuel}`);