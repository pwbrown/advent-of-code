/**
 * 2021-12-11 Part 2
 */
const {
  getEnergyLevels,
  iterate,
  flash,
} = require('./shared');

getEnergyLevels().then(levels => {
  let area = levels[0].length * levels.length; // width * height
  for (let step = 1;; step += 1) {
    let flashes = 0;
    iterate((r, c) => {
      levels[r][c] += 1;
      if (levels[r][c] === 10) {
        flash(levels, r, c, () => {
          flashes += 1;
        });
      }
    });
    iterate((r, c) => {
      if (levels[r][c] > 9) {
        levels[r][c] = 0;
      }
    });
    if (flashes === area) {
      console.log(`Answer: ${step}`);
      process.exit();
    }
  }
});