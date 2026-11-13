import { findEdges, minimumBindingsWithTwoCharges } from "./window";

const input = await Bun.file("3.txt").text();

const edges = findEdges(input);

const result = minimumBindingsWithTwoCharges(edges);

console.log(result);
