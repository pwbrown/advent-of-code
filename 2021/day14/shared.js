const { readLines } = require('../utils');

const getPolymerTemplate = () => readLines('polymer-template.txt').then(lines => ({
  elements: lines[0].split('').reduce((p, c) => ({
    ...p,
    [c]: (p[c] || 0) + 1,
  }), {}),
  pairs: lines[0].split('').reduce((p, c, i, arr) => i >= arr.length -1 ? p : ({
    ...p,
    [`${c}${arr[i+1]}`]: (p[`${c}${arr[i+1]}`] || 0) + 1,
  }), {}),
  rules: lines
    .slice(1)
    .map(l => l.split(' -> '))
    .reduce((p, [k, v]) => ({ ...p, [k]: v }), {}),
}));

const applyRules = (elements, pairs, rules) => {
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

exports.getAnswerForSteps = async (steps) => {
  const { elements, pairs, rules } = await getPolymerTemplate();
  for (let step = 0; step < steps; step += 1) {
    applyRules(elements, pairs, rules);
  }
  const { highest, lowest } = Object.values(elements).reduce((p, c) => ({
    highest: c > p.highest ? c : p.highest,
    lowest: c < p.lowest ? c : p.lowest,
  }), { highest: 0, lowest: Infinity });
  
  return highest - lowest;
}