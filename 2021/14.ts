import { getInput } from './utils';

interface NumKV {
  [ key: string ]: number;
}

interface StringKV {
  [ key: string ]: string;
}

interface Template {
  elements: NumKV;
  pairs: NumKV;
  rules: StringKV;
}

const getPolymerTemplate = (): Template => {
  const lines = getInput(14)
    .split('\n')
    .filter(line => !!line);
  return {
    elements: lines[0]
      .split('')
      .reduce<NumKV>((p, c) => ({
        ...p,
        [c]: (p[c] || 0) + 1,
      }), {}),
    pairs: lines[0]
      .split('')
      .reduce<NumKV>((p, c, i, arr) => i >= arr.length -1 ? p : ({
        ...p,
        [`${c}${arr[i+1]}`]: (p[`${c}${arr[i+1]}`] || 0) + 1,
      }), {}),
    rules: lines
      .slice(1)
      .map(l => l.split(' -> '))
      .reduce<StringKV>((p, [k, v]) => ({ ...p, [k]: v }), {}),
  };
};

const applyRules = (
  elements: NumKV,
  pairs: NumKV,
  rules: StringKV,
) => {
  Object.entries(pairs).forEach(([pair, count]) => {
    const insertion = rules[pair];
    if (insertion) {
      /** Increment insertion element first by pair count */
      elements[insertion] = (elements[insertion] || 0) + count;
      /** Remove all of the original pair */
      pairs[pair] -= count;
      /** Increment new pairs by pair count */
      [`${pair[0]}${insertion}`, `${insertion}${pair[1]}`].forEach(newPair => {
        pairs[newPair] = (pairs[newPair] || 0) + count;
      })
    }
  });
}

const getAnswerForSteps = (steps: number) => {
  const { elements, pairs, rules } = getPolymerTemplate();
  for (let step = 0; step < steps; step += 1) {
    applyRules(elements, pairs, rules);
  }
  const { highest, lowest } = Object.values(elements).reduce((p, c) => ({
    highest: c > p.highest ? c : p.highest,
    lowest: c < p.lowest ? c : p.lowest,
  }), { highest: 0, lowest: Infinity });
  
  return highest - lowest;
}

console.log(`Part 1: ${getAnswerForSteps(10)}`);
console.log(`Part 2: ${getAnswerForSteps(40)}`);