import { findExplodedBarrels, convertGridToPPM } from "./barrel";

const lines = await Bun.file("2.txt").text();

const grid = lines.split("\n").map((x) => x.split("").map(Number));

const topLeft = findExplodedBarrels(grid, 0, 0, new Set());

const bottomRight = findExplodedBarrels(
  grid,
  grid.length - 1,
  grid[0].length - 1,
  topLeft
);

console.log(bottomRight.size);

await convertGridToPPM(grid, bottomRight, 2);
