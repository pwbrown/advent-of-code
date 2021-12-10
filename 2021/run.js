const { readdirSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

const DAY_REGEX = /^day([0-9]+)$/;
const PART_REGEX = /^part([0-9]+)\.js$/;

const listDir = (path, type, regex) => readdirSync(path)
  .filter(dir => regex.test(dir))
  .map(dir => ({
    [type]: parseInt(dir.match(regex)[1]),
    path: join(path, dir),
  }))
  .sort((a, b) => a[type] - b[type]);

/** Intro */
console.log('*****************************************');
console.log('Advent of Code');
console.log(' -- Year           : 2021');
console.log(' -- Author         : pwbrown');
console.log(' -- Implementation : JavaScript (Node.js)');
console.log('*****************************************')

/** Run Each Day */
listDir(__dirname, 'day', DAY_REGEX).forEach(({ day, path }) => {
  console.log(`\nDay ${day.toString().padStart(2, '0')}`);
  console.log('------');
  /** Run Each Part */
  listDir(path, 'part', PART_REGEX).forEach(({ part, path }) => {
    console.log(`Part ${part}:`);
    console.log(spawnSync('node', [path]).stdout.toString());
  });
});
