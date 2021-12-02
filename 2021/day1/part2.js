/**
 * 2021-12-01 Part 2: Same problem except using measurment windows (3 consecutive measurements is a window)
 */
const { readDepthsToArray, countIncreases } = require('./utils');

readDepthsToArray().then(depths => {
  /** Convert depths to array of measurement windows */
  let windows = [];
  depths.forEach((depth, i) => {
    /** Create new window */
    windows.push([depth]);
    /** Add to previous 2 windows */
    for (let p = i - 1; p >= Math.max(0, i - 2); p -= 1) {
      windows[p].push(depth);
    }
  });
  /** Sum values in windows of at least 3 depths */
  windows = windows
    .filter(w => w.length === 3)
    .map(w => w.reduce((p, c) => p + c, 0));
  
  console.log(`Total increases: ${countIncreases(windows)}`);
})