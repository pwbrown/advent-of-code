/**
 * 2021-12-02 Part 1
 */
const { readCommands } = require('./shared');

readCommands().then(commands => {
  let horiz = 0;
  let depth = 0;
  let aim = 0;

  commands.forEach(([direction, value]) => {
    if (direction === 'forward') {
      horiz += value;
      depth += aim * value;
    } else if (direction === 'up') {
      aim -= value;
    } else if (direction === 'down') {
      aim += value;
    }
  });

  console.log(`Answer: ${horiz * depth}`);
});