import { findMessage, rotate, swapCells, type Cell } from "./message";

const txt = await Bun.file("3.txt").text();
const [operationsRaw, gridRaw] = txt.split("\n\n");
const operations = operationsRaw.trim().split("");

let grid = gridRaw.split("\n").map((row) => row.split(""));

let nextCells: Cell[][] = grid.map((row, y) => row.map((_, x) => [y, x]));

rotate(nextCells, operations);

let round = 1;

while (round < 1048576000) {
  if ((round & 1048576000) !== 0) {
    grid = swapCells(grid, nextCells);
  }
  nextCells = swapCells(nextCells, nextCells);
  round *= 2;
}

const result = findMessage(grid);

console.log(result);
