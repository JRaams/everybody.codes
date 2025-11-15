import { nextMoves, parse } from "./board";

const { grid, dragon, sheeps } = await parse("1.txt");

const seen = new Set<string>();
let cells = new Set<string>([dragon]);

for (let move = 0; move <= 4; move++) {
  const nextCells = new Set<string>();

  cells.forEach((cell) => {
    if (seen.has(cell)) return;
    seen.add(cell);

    nextMoves(grid, cell).forEach((x) => nextCells.add(x));
  });

  cells = nextCells;
}

console.log(seen.intersection(sheeps).size);
