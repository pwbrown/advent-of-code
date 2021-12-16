/**
 * 2021-12-12 Part 2
 */
const { getCaveConnections, countAllPaths } = require('./shared');

getCaveConnections().then(conns => {
  const count = countAllPaths(conns, true);
  console.log(`Answer: ${count}`);
});