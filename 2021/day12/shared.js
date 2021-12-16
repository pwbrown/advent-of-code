const { readLines } = require('../utils');

/** Returns an adjacency list */
exports.getCaveConnections = () => 
  readLines('cave-connections.txt', ['str','str'], '-')
    .then(conns => conns.reduce((p, [a, b]) => ({
      ...p,
      [a]: [ ...(p[a] || []), b],
      [b]: [ ...(p[b] || []), a],
    }), {}));

exports.countAllPaths = (conns, repeat = false) => {
  let count = 0;
  const queue = [];
  /* Add start to queue */
  queue.push({ cave: 'start', small: ['start'], twice: false });
  /** Keep going until the queue is empty */
  while (queue.length) {
    const { cave, small, twice } = queue.shift();
    if (cave === 'end') {
      count += 1;
      continue;
    }
    for (const adj of conns[cave]) {
      const inSmall = small.includes(adj);
      if (!inSmall) {
        const newSmall = [ ...small ];
        /** Check if it's a small cave */
        if (adj.toLowerCase() === adj) {
          newSmall.push(adj);
        }
        queue.push({ cave: adj, small: newSmall, twice });
      } else if (repeat && inSmall && !twice && !['start', 'end'].includes(adj)) {
        queue.push({ cave: adj, small, twice: true });
      }
    }
  }

  return count;
};