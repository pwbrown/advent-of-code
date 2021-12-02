const { createReadStream } = require('fs');
const { join } = require('path');
const { createInterface } = require('readline');

/** Read depth measurements from the depth file into an array of integers */
exports.readDepthsToArray = () => new Promise(res => {
  const file = join(__dirname, 'depth.txt');
  const read = createReadStream(file, { encoding: 'utf-8' });
  const rl = createInterface(read);
  
  const depths = [];
  rl.on('line', (reading) => {
    if (!reading) return;
    const depth = parseInt(reading);
    depths.push(depth);
  });
  
  rl.on('close', () => res(depths));
});

/** Count number of increases in an array of integers */
exports.countIncreases = arr => arr.reduce((p, c, i, a) => {
  if (i === 0) return p;
  if (c > a[i - 1]) p += 1;
  return p;
}, 0);