const { assert } = require('console');
const input = require('fs').readFileSync('6.txt').toString();

const parse = (txt) => txt.split('\n\n').map(g => g.split('\n').map(s => [...s]));

const count = (groups) => groups.reduce((total, group) => {
  const answers = new Set();
  group.forEach(person => person.forEach(a => answers.add(a)));
  return total + answers.size;
}, 0);

assert(count(parse('abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb')) === 11);

console.log(count(parse(input)));

// Part Two

const intersect = (arrays) => arrays.reduce((a, b) => a.filter(e => b.includes(e)));

const intersectCount = (groups) => groups.reduce((total, group) => total + intersect(group).length, 0);

assert(intersectCount(parse('abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb')) === 6);

console.log(intersectCount(parse(input)));
