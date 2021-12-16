/**
 * 2021-12-12 Part 1
 */
const { getCaveConnections, countAllPaths } = require('./shared');

getCaveConnections().then(conns => {
  const count = countAllPaths(conns);
  console.log(`Answer: ${count}`);
});