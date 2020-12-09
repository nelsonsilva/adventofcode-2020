const { assert } = require('console');
const input = require('fs').readFileSync('8.txt').toString().split('\n');

const test = [
'nop +0',
'acc +1',
'jmp +4',
'acc +3',
'jmp -3',
'acc -99',
'acc +1',
'jmp -4',
'acc +6',
];

const run = (program, fixes = []) => {
  const code = program.map(l => {
    const [op, arg] = l.split(' ');
    return [op, Number(arg)];
  });

  let ip = 0, acc = 0;

  do {
    let [op, arg] = code[ip];

    if (op !== 'acc' && fixes.includes(ip)) {
      op = (op === 'jmp' ? 'nop' : 'jmp');
    }
    if (code[ip].exec) {
      return [false, acc];
    }
    code[ip].exec = (code[ip].exec || 0) + 1;
    switch (op) {
      case 'acc':
        acc += arg;
        ip++;
        break;
      case 'jmp':
        ip += arg;
        break;
      case 'nop':
        ip++;
        break;
    }
  } while (ip < code.length);
  return [true, acc];
};

assert(run(test)[1] === 5);

console.log(run(input)[1]);

// PART 2 

assert(run(test, [7])[1] === 8);

let done = false, i = 0, acc;
while (!done) {
  [done, acc] = run(input, [i++]);
}

console.log(acc);
