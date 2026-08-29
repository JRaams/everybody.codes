import { Grid, parse } from "./grid";

const { width, height, horizontalOffsets, verticalOffsets } =
  await parse("2.txt");

const grid = new Grid(width, height);

grid.markEdges(horizontalOffsets, verticalOffsets);

grid.markGroups();

let green = 0;
let yellow = 0;

for (let y = 0; y < grid.cells.length; y++) {
  for (let x = 0; x < grid.cells[y].length; x++) {
    const cell = grid.cells[y][x];
    if (!cell.isIsolated) continue;

    if (cell.group === "green") green++;
    else if (cell.group === "yellow") yellow++;
  }
}

const largestGroup = Math.max(green, yellow);

console.log(largestGroup);
