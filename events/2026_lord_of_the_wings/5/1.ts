import { Land } from "./map";

const map = await Land.load("1.txt");

map.reconstructLand();

console.log(map.numCellsOfType("#"));
