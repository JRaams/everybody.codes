import { floodFarm, parse } from "./grid";

const txt = await Bun.file("1.txt").text();

const { grid, allPalms } = parse(txt);

const floodTimes = floodFarm(grid, allPalms, [[0, 1]]);

floodTimes.sort((a, b) => b - a);

console.log(floodTimes[0]);
