import { getInput, around } from './utils';

type EnergyLevels = number[][];

const getEnergyLevels = (): EnergyLevels =>
  getInput(11)
    .split('\n')
    .map(line => line.split('').map(n => parseInt(n)));

/** Iterate through coordinates of 2d array */
const iterate = (
  height: number,
  width: number,
  cb: (r: number, col: number) => void,
) => {
  for (let r = 0; r < height; r += 1) {
    for (let c = 0; c < width; c += 1) {
      cb(r, c);
    }
  }
}

/** flash stage of the step */
const flash = (
  all: EnergyLevels,
  row: number,
  col: number,
  cb: () => void,
) => {
  cb();
  around(all, row, col, true)
    .forEach(({ row: r, col: c }) => {
      all[r][c] += 1;
      if (all[r][c] === 10) {
        flash(all, r, c, cb);
      }
    });
}


let totalFlashes = 0;
let part1Finished = false;
let part2Finished = false;
let levels = getEnergyLevels();
const h = levels.length;
const w = levels[0].length;
const area = h * w;
for (let step = 1;; step += 1) {
  let stepFlashes = 0;
  iterate(h, w, (r, c) => {
    levels[r][c] += 1;
    if (levels[r][c] === 10) {
      flash(levels, r, c, () => {
        totalFlashes += 1;
        stepFlashes += 1;
      });
    }
  });
  iterate(h, w, (r, c) => {
    if (levels[r][c] > 9) {
      levels[r][c] = 0;
    }
  });

  /** Part 1 */
  if (step === 100) {
    part1Finished = true;
    console.log(`Part 1: ${totalFlashes}`);
  }

  if (stepFlashes === area && !part2Finished) {
    part2Finished = true;
    console.log(`Part 2: ${step}`);
  }

  if (part1Finished && part2Finished) {
    process.exit();
  }
}