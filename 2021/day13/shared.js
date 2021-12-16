const { readLines } = require('../utils');

const FOLD = /^fold along ([xy])=([0-9]+)/;

exports.getPaperPuzzle = () => readLines('paper-puzzle.txt').then(lines => {
  const dots = [];
  const folds = [];
  lines.forEach(line => {
    if (FOLD.test(line)) {
      const [,dir,num] = line.match(FOLD);
      folds.push({ dir, split: parseInt(num) });
    } else {
      const [x, y] = line.split(',').map(p => parseInt(p));
      dots.push({ x, y });
    }
  });
  
  return { dots, folds };
});

const mirror = (split, val) => val - ((val - split) * 2);

exports.foldPaper = (dots, fold) => {
  const { dir, split } = fold;
  for (let i = dots.length - 1; i >= 0; i -= 1) {
    const orig = dots[i][dir];
    /** Only look at dots past the fold */
    if (orig > split) {
      const folded = { ...dots[i], [dir]: mirror(split, orig) };
      dots.splice(i, 1);
      if (!dots.find(d => d.x === folded.x && d.y === folded.y)) {
        dots.push(folded);
      }
    }
  }
}