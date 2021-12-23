import { getInput } from './utils';
import { randomUUID } from 'crypto';

interface Node {
  uid: string;
  value: number | null;
  left: Node | null;
  right: Node | null;
}

type Action = {
  type: 'explode' | 'split';
  visited?: { [key: string]: boolean };
  left?: number | null;
  right?: number | null;
}

type Direction = 'left' | 'right';

const LTR: Direction[] = ['left', 'right'];
const RTL: Direction[] = ['right', 'left'];

const createNode = (val: any[] | number): Node => {
  const isArr = Array.isArray(val);
  return {
    uid: randomUUID(),
    value: !isArr ? val : null,
    left: isArr ? createNode(val[0]) : null,
    right: isArr ? createNode(val[1]) : null,
  };
};

const isNum = (val: any): val is number => typeof val === 'number';

const nodeToString = (node: Node): string => {
  if (node.value !== null) {
    return node.value.toString();
  }
  const left = nodeToString(node.left as Node);
  const right = nodeToString(node.right as Node);
  return `[${left}, ${right}]`;
}

const magnitude = (node: Node): number => {
  if (isNum(node.value)) {
    return node.value;
  }
  const left = magnitude(node.left as Node);
  const right = magnitude(node.right as Node);
  return (3 * left) + (2 * right);
}

const getSnailNumbers = () => getInput(18)
  .split('\n')
  .map(line => createNode(JSON.parse(line)));

const reduceNode = (
  node: Node,
  split: boolean,
  level = 1, 
  action: Action | null = null,
  direction: Direction | null = null,
): Action | null => {
  /** Ignore if action is split */
  if (action?.type === 'split') {
    return action;
  }
  /** Handle existing explosion */
  if (action?.type === 'explode') {
    if (!direction || !isNum(action[direction])) return action;
    if (isNum(node?.value)) {
      node.value += action[direction] as number;
      action[direction] = null;
    } else {
      const order = direction === 'left' ? RTL : LTR;
      for (const side of order) {
        if (!isNum(action?.[direction])) continue;
        action = reduceNode(node?.[side] as Node, split, level + 1, action, direction);
      }
    }
    return action;
  }
  /** Handle new explosion */
  if (!action && level > 4 && isNum(node?.left?.value) && isNum(node?.right?.value)) {
    action = {
      type: 'explode',
      visited: {},
      left: node?.left?.value,
      right: node?.right?.value,
    }
    node.value = 0;
    node.left = null;
    node.right = null;
    return action;
  }
  /** Handle regular number */
  if (isNum(node?.value)) {
    /** Handle split */
    if (split && !action && node?.value > 9) {
      const half = node.value / 2;
      for (const nodeSide of LTR) {
        node[nodeSide] = {
          uid: randomUUID(),
          value: Math[nodeSide === 'left' ? 'floor' : 'ceil'](half),
          left: null,
          right: null,
        }
      }
      node.value = null;
      action = { type: 'split' };
    }
    return action;
  }
  /** Handle left and right nodes */
  for (const side of LTR) {
    if (!node[side]) continue;
    action = reduceNode(node[side] as Node, split, level + 1, action);
    const opp = side === 'left' ? 'right' : 'left';
    if (action?.type === 'explode') {
      (action as any).visited[node[side]?.uid as string] = true;
      if (action?.type === 'explode' && isNum(action?.[opp]) && !action?.visited?.[node?.[opp]?.uid as string]) {
        action = reduceNode(node[opp] as Node, split, level + 1, action, opp);
      }
    }
  }
  return action;
}

const addNodes = (a: Node, b: Node): Node => {
  const added: Node = {
    uid: randomUUID(),
    value: null,
    left: { ...a },
    right: { ...b },
  };

  /** Continue to reduce added number until no more actions have been performed */
  let action: Action | null = null;
  do {
    /** Check for exploding nodes */
    action = reduceNode(added, false);
    /** Check for splitting nodes */
    if (!action) {
      action = reduceNode(added, true);
    }
  } while (action !== null);

  return added;
}

const part1Numbers = getSnailNumbers();

let added = part1Numbers[0];
for (let i = 1; i < part1Numbers.length; i += 1) {
  added = addNodes(added, part1Numbers[i]);
}

console.log(`Part 1: ${magnitude(added)}`);

let part2Numbers = getSnailNumbers();

let magnitudes = [];

const copy = JSON.stringify(part2Numbers);
for (let i = 0; i < part2Numbers.length; i += 1) {
  for (let j = 0; j < part2Numbers.length; j += 1) {
    if (i === j) continue;
    magnitudes.push(magnitude(addNodes(part2Numbers[i], part2Numbers[j])));
    part2Numbers = JSON.parse(copy);
  }
}

console.log(`Part 2: ${Math.max(...magnitudes)}`)
