const { assert } = require('console');
const passes = require('fs').readFileSync('5.txt').toString().split('\n');

const ROWS = 128;
const COLS = 8;

const id = (row, col) => row * 8 + col;

function find(str, rows = [0, ROWS - 1], cols = [0, COLS - 1]) {
  const part = str[0];
  if (!part) return [rows[0], cols[0], id(rows[0], cols[0])];
  const hRow = ((rows[1] - rows[0] + 1) / 2) + rows[0];
  const hCol = ((cols[1] - cols[0] + 1) / 2) + cols[0];
  switch (part) {
    case 'F':
      rows = [rows[0], hRow - 1];
      break;
    case 'B':
      rows = [hRow, rows[1]];
      break;
    case 'L':
      cols = [cols[0], hCol - 1];
      break;
    case 'R':
      cols = [hCol, cols[1]];
      break;
  }
  return find(str.substr(1), rows, cols);
}

const equals = (a, b) => JSON.stringify(a) == JSON.stringify(b);

assert(equals(find('BFFFBBFRRR'), [70, 7, 567]));
assert(equals(find('FFFBBBFRRR'), [14, 7, 119]));
assert(equals(find('BBFFBBFRLL'), [102, 4, 820]));

const h = passes.reduce((res, pass) => {
  const [r, c, id] = find(pass);
  return id > res ? id : res;
}, 0);

console.log(`Highest ID is ${h}`);

// Part 2

const seats = passes.map(p => find(p));

// all possible seats
const available = [];
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const s = [row, col, id(row, col)];
    if (!seats.some(s2 => equals(s2, s))) {
      available.push(s);
    }
  }
}

// very unscientific way of finding the proper seat... 
// by looking at the console log and finding the one at the middle ¯\_(ツ)_/¯
available.forEach(s => console.log(s));

