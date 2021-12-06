/**
 * 2021-12-04 Part 1
 */
const { getBingoGame, markBoard } = require('./shared');

getBingoGame().then(({ numbers, boards }) => {
  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = 0; j < boards.length; j += 1) {
      const { answer, won } = markBoard(boards[j], numbers[i]);
      if (won) {
        console.log(`Answer: ${answer}`);
        process.exit();
      }
    }
  }
});
