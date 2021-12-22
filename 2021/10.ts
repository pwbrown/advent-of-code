import { getInput } from './utils';

const BLOCKS: { [ key: string ]: string } = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const ERROR_POINTS: { [ key: string ]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const COMPLETION_POINTS: { [ key: string ]: number } = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const getRemainingChars = (line: string) => {
  let stack = [];
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]
    if (BLOCKS[char])
      stack.push(BLOCKS[char]);
    else if (stack[stack.length - 1] === char)
      stack.pop();
    else
      throw char; /** Throw error with violating character */
  }
  return stack.reverse();
}

const navLines = getInput(10).split('\n');

const scores: number[] = [];
let errorPoints = 0;

navLines.forEach(line => {
  try {
    const remaining = getRemainingChars(line);
    const score = remaining.reduce((p, c) => (p * 5) + COMPLETION_POINTS[c], 0);
    scores.push(score);
  } catch(e: any) {
    errorPoints += ERROR_POINTS[e]
  }
});

scores.sort((a, b) => a - b);

const middleIndex = Math.floor(scores.length / 2);
const middleScore = scores[middleIndex];

console.log(`Part 1: ${errorPoints}`);
console.log(`Part 2: ${middleScore}`);