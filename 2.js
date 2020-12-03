const { assert } = require('console');

const lines = require('fs').readFileSync('2.txt').toString().split('\n');

let isValid;

// PART 1
isValid = (line) => {
  const [_, minStr, maxStr, letter, password] = line.match(/(\d+)-(\d+) (.): (.*)/);
  const count = [...password].filter(c => c === letter).length;
  return count >= Number(minStr) && count <= Number(maxStr);
};

assert(isValid('1-3 a: abcde'));
assert(!isValid('1-3 b: cdefg'));
assert(isValid('2-9 c: ccccccccc'));

console.log(lines.filter(isValid).length);

// PART 2
isValid = (line) => {
  const [_, pos1, pos2, letter, password] = line.match(/(\d+)-(\d+) (.): (.*)/);
  return (password[Number(pos1) - 1] === letter) ^ (password[Number(pos2) - 1] === letter); // XOR
};

assert(isValid('1-3 a: abcde'));
assert(!isValid('1-3 b: cdefg'));
assert(!isValid('2-9 c: ccccccccc'));

console.log(lines.filter(isValid).length);