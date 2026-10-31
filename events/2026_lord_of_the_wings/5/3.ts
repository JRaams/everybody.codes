import { Land } from "./map";

const map = await Land.load("3.txt");

map.reconstructLand();

const coastline = map.determineCoastline();
map.markRemainingSand(coastline);

map.decorateWithTrees();
map.growForest();
map.growForest();

console.log(map.numCellsOfType("@"));
