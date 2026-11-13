import { findEdges, minimumBindings } from "./window";

const input = await Bun.file("2.txt").text();

const edges = findEdges(input);

const result = minimumBindings(edges);

console.log(result);
