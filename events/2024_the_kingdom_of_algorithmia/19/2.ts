import { rotate, findMessage } from "./message";

const txt = await Bun.file("2.txt").text();

const [operationsRaw, gridRaw] = txt.split("\n\n");

const operations = operationsRaw.trim().split("");
const grid = gridRaw.split("\n").map((row) => row.split(""));

for (let i = 0; i < 100; i++) {
  rotate(grid, operations);
}

const result = findMessage(grid);

console.log(result);
