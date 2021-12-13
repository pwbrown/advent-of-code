/**
 * 2021-12-11 Part 1
 */
const {
  getEnergyLevels,
  iterate,
  flash,
} = require('./shared');

let flashes = 0;

/** main */
getEnergyLevels().then(levels => {
  for (let step = 0; step < 100; step += 1) {
    /** Increment all and flash when appropriate */
    iterate((r, c) => {
      levels[r][c] += 1;
      if (levels[r][c] === 10)
        flash(levels, r, c, () => {
          flashes += 1;
        });
    });
    /** Reset flashed octopi */
    iterate((r, c) => {
      if (levels[r][c] > 9)
        levels[r][c] = 0;
    });
  }

  console.log(`Answer: ${flashes}`)
})