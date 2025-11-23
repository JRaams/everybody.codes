import { findShortestPath } from "./grid";

const lines = await Bun.file("3.txt").text();

const shortestPathLength = findShortestPath(lines);

console.log(shortestPathLength);
