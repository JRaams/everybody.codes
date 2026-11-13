import { findEdges } from "./window";

const input = await Bun.file("1.txt").text();

const edges = findEdges(input);

console.log(edges.length);
