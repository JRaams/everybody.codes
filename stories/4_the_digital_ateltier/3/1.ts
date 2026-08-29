import { Grid, parse } from "./grid";

const { width, height, horizontalOffsets, verticalOffsets } =
  await parse("1.txt");

const grid = new Grid(width, height);

grid.markEdges(horizontalOffsets, verticalOffsets);

let isolated = 0;

for (let y = 0; y < grid.cells.length; y++) {
  for (let x = 0; x < grid.cells[y].length; x++) {
    const cell = grid.cells[y][x];
    if (cell.isIsolated) {
      isolated++;
    }
  }
}

console.log(isolated);
