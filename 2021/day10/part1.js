/**
 * 2021-12-10 Part 1
 */
const { getNavSubsystemLines, getRemainingChars } = require('./shared');

const POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

getNavSubsystemLines().then(lines => {
  const errorPoints = lines.reduce((p, c) => {
    try {
      getRemainingChars(c);
    } catch(e) {
      /** e contains the violating character */
      p += POINTS[e];
    }
    return p;
  }, 0);
  console.log(`Answer: ${errorPoints}`);
});