/**
 * 2021-12-07 Part 1
 */
const { getInitialPositions, getMinFuel } = require('./shared');

const positions = getInitialPositions();

const minFuel = getMinFuel(positions, (pos, target) => Math.abs(pos - target));

console.log(`Answer: ${minFuel}`);