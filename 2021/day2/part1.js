/**
 * 2021-12-02 Part 1: Determine final position and multiply horizontal by vertical value
 */
const { readCommandsToArray } = require('./utils');

readCommandsToArray().then(commands => {
  let horiz = 0;
  let depth = 0;

  commands.forEach(([direction, value]) => {
    if (direction === 'forward') {
      horiz += value;
    } else if (direction === 'up') {
      depth -= value;
    } else if (direction === 'down') {
      depth += value;
    }
  });

  console.log(`Answer: ${horiz * depth}`);
});