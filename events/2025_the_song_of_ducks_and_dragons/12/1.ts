import { findExplodedBarrels } from "./barrel";

const lines = await Bun.file("1.txt").text();

const grid = lines.split("\n").map((x) => x.split("").map(Number));

const barrels = findExplodedBarrels(grid, 0, 0, new Set());

console.log(barrels.size);
