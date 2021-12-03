const { createReadStream } = require('fs');
const { join } = require('path');
const { createInterface } = require('readline');

/**
 * 
 * @param {string} file File in 2021 data directory
 * @param {string[]} columns Array of column transformations
 * @param {string} delim Column delimiter
 * @returns 
 */
exports.readLines = (file, columns = null, delim = ' ') => new Promise(res => {
  const path = join(__dirname, 'data', file);
  const read = createReadStream(path, { encoding: 'utf-8' });
  const rl = createInterface(read);
  
  const rows = [];
  rl.on('line', (reading) => {
    if (!reading) return;
    if (!columns) rows.push(reading);
    else {
      let vals = reading.split(delim);
      vals = vals.map((v, i) => {
        if (i >= columns.length) return v;
        switch(columns[i]) {
          case 'num':
            const float = parseFloat(v);
            return isNaN(float) ? v : float;
          case 'str':
            return v;
          default:
            throw Error(`Unrecognized column type: ${columns[i]}`);
        }
      });
      rows.push(vals.length > 1 ? vals : vals[0]);
    }
  });
  
  rl.on('close', () => res(rows));
});