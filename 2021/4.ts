import { getInput } from './utils';

type Box = [number, boolean];
type Board = Box[][];

const getGame = () => {
  const lines = getInput(4).split('\n');
  const numbers = lines[0].split(',').map(n => parseInt(n));
  const boards = [];
  for (let i = 2; i < lines.length; i += 6) {
    const board = [];
    for (let j = i; j < i + 5; j += 1) {
      const row: Box[] = lines[j]
        .trim()
        .split(/\s+/)
        .map(n => [parseInt(n, 10), false]);
        board.push(row);
    }
    boards.push(board);
  }

  return { numbers, boards };
}

const markBoard = (board: Board, number: number) => {
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
  };
}

const game1 = getGame();

part1:
for (let i = 0; i < game1.numbers.length; i += 1) {
  for (let j = 0; j < game1.boards.length; j += 1) {
    const { answer, won } = markBoard(game1.boards[j], game1.numbers[i]);
    if (won) {
      console.log(`Part 1: ${answer}`);
      break part1;
    }
  }
}

const game2 = getGame();

part2:
for (let i = 0; i < game2.numbers.length; i += 1) {
  /** Last remaining board: Keep marking it until it wins */
  if (game2.boards.length === 1) {
    const { answer, won } = markBoard(game2.boards[0], game2.numbers[i]);
    if (won) {
      console.log(`Part 2: ${answer}`);
      break part2;
    }
  } else {
    /** Filter boards until only 1 remains */
    game2.boards = game2.boards.filter(b => !markBoard(b, game2.numbers[i]).won);
  }
}
  