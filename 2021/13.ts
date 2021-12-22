import { getInput } from './utils';

interface Dot {
  x: number;
  y: number;
  [key: string]: number;
}

interface Fold {
  dir: string;
  split: number;
}

interface Puzzle {
  dots: Dot[];
  folds: Fold[];
}

const FOLD = /^fold along ([xy])=([0-9]+)/;

const getPaperPuzzle = () => getInput(13)
    .split('\n')
    .filter(line => !!line)
    .reduce<Puzzle>((p, line) => {
      if (FOLD.test(line)) {
        const [,dir,num] = line.match(FOLD) as string[];
        p.folds.push({ dir, split: parseInt(num) });
      } else {
        const [x, y] = line.split(',').map(p => parseInt(p));
        p.dots.push({ x, y })
      }
      return p;
    }, {
      dots: [],
      folds: []
    });

const mirror = (split: number, val: number) => val - ((val - split) * 2);

const foldPaper = (dots: Dot[], fold: Fold) => {
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

const part1 = getPaperPuzzle();
foldPaper(part1.dots, part1.folds[0]);
console.log(`Part 1: ${part1.dots.length}`);

const part2 = getPaperPuzzle();
part2.folds.forEach(fold => {
  foldPaper(part2.dots, fold);
});
const width = Math.max(...part2.dots.map(d => d.x)) + 1;
const height = Math.max(...part2.dots.map(d => d.y)) + 1;
const grid = new Array(height);
for (let r = 0; r < height; r += 1) {
  grid[r] = new Array(width).fill(' ');
}
part2.dots.forEach(({ x, y }) => {
  grid[y][x] = '#';
});
const display = grid.map(row => row.join('')).join('\n');
console.log('Part 2:');
console.log(display);