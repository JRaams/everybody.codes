import { readRunicWord, calculateRunicPower } from "./shrine";

const txt = await Bun.file("2.txt").text();

const lines = txt.split("\n");

type Shrine = string[][];

const shrineGrid: Shrine[][] = [];

let y = 0;

lines.forEach((line) => {
  if (line.trim() === "") {
    y++;
    return;
  }

  const parts = line.split(" ");

  parts.forEach((part, x) => {
    if (shrineGrid[y] === undefined) {
      shrineGrid[y] = [];
    }
    if (shrineGrid[y][x] === undefined) {
      shrineGrid[y][x] = [];
    }

    shrineGrid[y][x].push(part.split(""));
  });
});

let result = 0;

shrineGrid.flat().forEach((shrine) => {
  const rune = readRunicWord(shrine);
  const power = calculateRunicPower(rune);
  result += power;
});

console.log(result);
