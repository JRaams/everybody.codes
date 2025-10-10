import { rotate, findMessage } from "./message";

const txt = await Bun.file("1.txt").text();

const [operationsRaw, gridRaw] = txt.split("\n\n");
const operations = operationsRaw.trim().split("");
const grid = gridRaw.split("\n").map((row) => row.split(""));

rotate(grid, operations);

const result = findMessage(grid);

console.log(result);
