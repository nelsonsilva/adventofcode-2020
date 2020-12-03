const terrain = require('fs').readFileSync('3.txt').toString().split('\n');

const height = terrain.length;
const width = terrain[1].length;

console.log(`${width} x ${height}`);

const square = ({top, left}) => terrain[top][left % width];

const traverse = (dx, dy) => {
  const pos = {top: 0, left: 0};

  const encounters = [];

  while (pos.top < height) {
    encounters.push(square(pos));
    pos.top += dy;
    pos.left += dx;
  }

  return encounters;
}

const treeverse = (dx, dy) => traverse(dx, dy).filter(s => s === '#').length;

console.log(`Encountered ${treeverse(3, 1)} trees`);

// PART 2
console.log(treeverse(1, 1) * treeverse(3, 1) * treeverse(5, 1) * treeverse(7, 1) * treeverse(1, 2));
