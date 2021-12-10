const { readLines } = require('../utils');

const splitAndSort = (str) =>
  str
    .split(' ')
    .map(p => p.split('').sort().join(''))

exports.getSignalPatterns = () =>
  readLines('signal-patterns.txt', ['str', 'str'], ' | ')
    .then(lines => lines.map(line => ({
      patterns: splitAndSort(line[0]),
      outputs: splitAndSort(line[1]),
    })));
