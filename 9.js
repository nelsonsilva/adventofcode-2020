const { assert } = require('console');
const input = require('fs').readFileSync('9.txt').toString().split('\n').map(Number);

const test = [
  35,
  20,
  15,
  25,
  47,
  40,
  62,
  55,
  65,
  95,
  102,
  117,
  150,
  182,
  127,
  219,
  299,
  277,
  309,
  576,
];

const sums = (numbers) => numbers.flatMap((a, idx) => numbers.filter((_, i) => i != idx).map(b => a + b));

const check = (input, n) => {
  for (let i = n; i < input.length; i++) {
    const previous = input.slice(i - n, i);
    if (!sums(previous).includes(input[i])) {
      return input[i];
    }
  }
}

// assert(check(test, 5) === 127);

const res = check(input, 25);
console.log(res);

// PART 2

const findSum = (input, n) => {
  for (let i = 0; i < input.length; i++) {
    let numbers = [], sum = 0, j = i;
    while (sum < n && j < input.length) {
      numbers.push(input[j])
      sum += input[j];
      j++;
    }
    if (sum == n) {
      const [min, max] = numbers.reduce(([min, max], n) => [Math.min(min, n), Math.max(max, n)], [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]);
      return min + max;
    }
  }
}

assert(findSum(test, 127) == 62);

console.log(findSum(input, res));
