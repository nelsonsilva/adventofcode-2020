const { assert } = require('console');
const input = require('fs').readFileSync('7.txt').toString();

const parse = (txt) => {
  const bags = {};
  txt.split('\n').forEach(l => {
    const [_, container, containsStr] = l.match(/(.*) bags contain (.*)/);
    if (containsStr !== 'no other bags.') {
      const contains = bags[container] = {};
      containsStr.split(',').forEach(c => {
        const [_, n, bag] = c.match(/(\d) (.*) bag/)
        contains[bag] = Number(n);
      });
    }
  });
  return bags;
};

const test = [
  'light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.',
].join('\n');

let bags = parse(test);

const containersFor = (bag) => {
  const res = new Set();

  function path(start, current = start) {
    // console.log(`Does ${current} contain '${bag}'?`);
    const contains = Object.keys(bags[current] || {});
    if (contains.includes(bag)) {
      return res.add(start);
    }
    contains.forEach(b => path(start, b));
  }

  Object.keys(bags).forEach(b => path(b));

  return res;
}

assert(containersFor('shiny gold').size === 4);

bags = parse(input);
console.log(containersFor('shiny gold').size);

// Part 2

const test2 = [
  'shiny gold bags contain 2 dark red bags.',
  'dark red bags contain 2 dark orange bags.',
  'dark orange bags contain 2 dark yellow bags.',
  'dark yellow bags contain 2 dark green bags.',
  'dark green bags contain 2 dark blue bags.',
  'dark blue bags contain 2 dark violet bags.',
  'dark violet bags contain no other bags.',
].join('\n');

bags = parse(test2);

function bagsIn(bag) {
  return Object.entries(bags[bag] || {}).reduce((res, [b, n]) => res + n + (n * bagsIn(b)), 0); 
}

assert(bagsIn('dark blue') === 2);
assert(bagsIn('dark green') === 6);
assert(bagsIn('shiny gold') === 126);

bags = parse(input);

console.log(bagsIn('shiny gold'));
