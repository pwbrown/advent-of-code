/**
 * 2021-12-07 Part 2
 */
const { getInitialPositions, getMinFuel } = require('./shared');

const positions = getInitialPositions();

const minFuel = getMinFuel(positions, (pos, target) => {
  const steps = Math.abs(pos - target);
  let fuel = 0;
  for (let i = 0; i < steps; i += 1) {
    fuel += (i + 1);
  }
  return fuel;
});

console.log(`Answer: ${minFuel}`);