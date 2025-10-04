import { readRunicWord } from "./shrine";

const txt = await Bun.file("1.txt").text();
const grid = txt
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const result = readRunicWord(grid);

console.log(result);
