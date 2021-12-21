import { getInput } from './utils';

const commands = getInput(2)
  .split('\n')
  .map(l => {
    const [direction, value] = l.split(' ');
    return {
      direction,
      value: parseInt(value),
    };
  });

let horiz = 0;
let depth1 = 0;
let depth2 = 0;
let aim = 0;

commands.forEach(({ direction, value }) => {
  if (direction === 'forward') {
    horiz += value;
    depth2 += aim * value;
  } else if (direction === 'up') {
    depth1 -= value;
    aim -= value;
  } else if (direction === 'down') {
    depth1 += value;
    aim += value;
  }
});

console.log(`Part 1: ${horiz * depth1}`);
console.log(`Part 2: ${horiz * depth2}`);