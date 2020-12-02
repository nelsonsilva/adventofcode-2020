const input = require('fs').readFileSync('1.txt').toString().split('\n').map(Number);

let a, b, c;
a = input.find(a => b = input.find(b => a + b === 2020));

console.log(`${a} * ${b} = ${a * b}`);

// PART 2

a = input.find(a => b = input.find(b => c = input.find(c => a + b + c === 2020)));

console.log(`${a} * ${b} * ${c} = ${a * b * c}`);