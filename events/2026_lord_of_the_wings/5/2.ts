import { Land } from "./map";

const map = await Land.load("2.txt");

map.reconstructLand();

const coastline = map.determineCoastline();
map.markRemainingSand(coastline);

console.log(map.numCellsOfType("="));
