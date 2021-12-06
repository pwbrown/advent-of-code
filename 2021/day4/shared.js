const { readLines } = require('../utils');

/** Get bingo numbers and bingo boards */
exports.getBingoGame = () => readLines('bingo.txt').then(lines => {
  const numbers = lines[0].split(',').map(n => parseInt(n, 10));

  const boards = [];

  /** Iterate through all boards */
  for (let i = 1; i < lines.length; i += 5) {
    const board = [];
    for (let j = i; j < i + 5; j += 1) {
      const row = lines[j].trim().split(/\s+/).map(n => [parseInt(n, 10), false]);
      board.push(row);
    }
    boards.push(board);
  }

  return { numbers, boards };
});

/** Update board with the next number and return the current state */
exports.markBoard = (board, number) => {
  let sum = 0;
  let won = false;
  const rows = Array(5).fill(0);
  const cols = Array(5).fill(0);
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[r].length; c += 1) {
      /** Mark number on board */
      if (board[r][c][0] === number)
        board[r][c][1] = true;
      /** Check if number on board is marked */
      if (board[r][c][1]) {
        rows[r] += 1;
        cols[c] += 1;
        /** Board is a winner if marked count in row or column is 5 */
        if (rows[r] === 5 || cols[c] === 5)
          won = true;
      } else {
        sum += board[r][c][0];
      }
    }
  }

  return {
    won,
    answer: sum * number,
  }
};