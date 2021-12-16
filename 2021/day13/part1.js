/**
 * 2021-12-13 Part 1
 */
const { getPaperPuzzle, foldPaper } = require('./shared');

getPaperPuzzle().then(({ dots, folds }) => {
  foldPaper(dots, folds[0]);
  console.log(`Answer: ${dots.length}`);
});
