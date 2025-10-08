import { floodFarm, parse } from "./grid";

const txt = await Bun.file("2.txt").text();

const { grid, allPalms } = parse(txt);

const floodTimes = floodFarm(grid, allPalms, [
  [0, 1],
  [grid[0].length - 1, grid.length - 2],
]);

floodTimes.sort((a, b) => b - a);

console.log(floodTimes[0]);
