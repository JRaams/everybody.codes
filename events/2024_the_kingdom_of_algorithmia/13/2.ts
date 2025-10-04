import { findShortestPath, parseGrid } from "./grid";

const txt = await Bun.file("2.txt").text();

const { start } = parseGrid(txt);

const result = findShortestPath(start, "E");

console.log(result);
