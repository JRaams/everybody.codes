import { nextMoves, parse } from "./board";

const { grid, dragon } = await parse("2.txt");

let cells = new Set([dragon]);
const eaten = new Set<string>();

for (let move = 0; move < 20; move++) {
  const nextCells = new Set<string>();

  cells.forEach((cell) => {
    nextMoves(grid, cell).forEach((x) => nextCells.add(x));
  });

  cells = nextCells;

  cells.forEach((cell) => {
    const [y, x] = cell.split(",").map(Number);

    if (grid[y][x] === "#") return;

    if (grid[y - move]?.[x] === "S") {
      eaten.add(`${y - move},${x}`);
    }

    if (grid[y - move - 1]?.[x] === "S") {
      eaten.add(`${y - move - 1},${x}`);
    }
  });
}

console.log(eaten.size);
