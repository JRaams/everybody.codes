import { findShortestPath, parseGrid } from "./grid";

const txt = await Bun.file("3.txt").text();

const { end } = parseGrid(txt);

const result = findShortestPath(end, "S");

console.log(result);
