const { readLines } = require('../utils');

/** width */
let w = 0;

/** height */
let h = 0;

exports.getEnergyLevels = () =>
  readLines('octopus-energy.txt')
    .then(lines => {
      const all = lines.map(line =>
        line
          .split('')
          .map(n => parseInt(n))
      );
      
      w = all[0].length;
      h = all.length;
      return all;
    });

/** Iterate through coordinates of 2d array */
exports.iterate = (cb) => {
  for (let r = 0; r < h; r += 1) {
    for (let c = 0; c < w; c += 1) {
      cb(r, c);
    }
  }
}

/** Call the callback function for every coordinate surrounding a point */
const around = (row, col, cb) => {
  /** Iterate through 3 x 3 grid and exclude center */
  for (let r = Math.max(row - 1, 0); r <= Math.min(row + 1, h - 1); r += 1) {
    for (let c = Math.max(col - 1, 0); c <= Math.min(col + 1, w - 1); c += 1) {
      if (r !== row || c !== col)
        cb(r, c);
    }
  }
}

/** flash stage of the step */
const flash = exports.flash = (all, row, col, cb) => {
  cb();
  around(row, col, (r, c) => {
    all[r][c] += 1;
    if (all[r][c] === 10)
      flash(all, r, c, cb);
  });
}