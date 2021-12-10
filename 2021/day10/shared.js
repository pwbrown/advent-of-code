const { readLines } = require('../utils');

exports.getNavSubsystemLines = () => readLines('nav-subsystem.txt')

const BLOCKS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

exports.getRemainingChars = (line) => {
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