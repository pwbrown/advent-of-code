import { getInput } from './utils';

type Connections = {
  [ key: string ]: string[];
}

interface QueueItem {
  cave: string;
  small: { [ key: string]: boolean };
  twice: boolean;
}

/** This is REALLY SLOW with repeat enabled (could try to boost performance at some point) */
const countAllPaths = (conns: Connections, repeat = false) => {
  let count = 0;
  const queue: QueueItem[] = [];
  /* Add start to queue */
  queue.push({ cave: 'start', small: { start: true }, twice: false });
  /** Keep going until the queue is empty */
  while (queue.length) {
    const { cave, small, twice } = queue.shift() as QueueItem;
    if (cave === 'end') {
      count += 1;
      continue;
    }
    for (const adj of conns[cave]) {
      const inSmall = !!small[adj];
      if (!inSmall) {
        const newSmall = { ...small };
        /** Check if it's a small cave */
        if (adj.toLowerCase() === adj) {
          newSmall[adj] = true;
        }
        queue.push({ cave: adj, small: newSmall, twice });
      } else if (repeat && inSmall && !twice && !['start', 'end'].includes(adj)) {
        queue.push({ cave: adj, small, twice: true });
      }
    }
  }

  return count;
};

const connections = getInput(12)
  .split('\n')
  .map(line => line.split('-'))
  .reduce<Connections>((p, [a, b]) => ({
    ...p,
      [a]: [ ...(p[a] || []), b],
      [b]: [ ...(p[b] || []), a],
  }), {});

console.log(`Part 1: ${countAllPaths(connections)}`);
console.log(`Part 2: ${countAllPaths(connections, true)}`);