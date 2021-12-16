/**
 * 2021-12-13 Part 2
 */
const { getPaperPuzzle, foldPaper } = require('./shared');

getPaperPuzzle().then(({ dots, folds }) => {
  folds.forEach(fold => {
    foldPaper(dots, fold);
  });
  /** Generate grid */
  const width = Math.max(...dots.map(d => d.x)) + 1;
  const height = Math.max(...dots.map(d => d.y)) + 1;
  const grid = new Array(height);
  for (let r = 0; r < grid.length; r += 1) {
    grid[r] = new Array(width).fill(' ');
  }
  dots.forEach(({x, y}) => {
    grid[y][x] = '#';
  });
  const display = grid.map(row => row.join('')).join('\n');
  console.log('Answer:');
  console.log(display);
});