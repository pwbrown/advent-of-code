/**
 * 2021-12-10 Part 2
 */
const { getNavSubsystemLines, getRemainingChars } = require('./shared');

const POINTS = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

getNavSubsystemLines().then(lines => {
  const scores = lines
    .map(line => {
      let remaining;
      try {
        remaining = getRemainingChars(line);
      } catch(e) {
        /** Line is corrupted, so filter out later */
        return null;
      }
      const score = remaining.reduce((p, c) => (p * 5) + POINTS[c], 0);
      return score
    })
    .filter(score => score !== null)
    .sort((a, b) => a - b);
  const middleIndex = Math.floor(scores.length / 2);
  const middleScore = scores[middleIndex];
  console.log(`Answer: ${middleScore}`);
});