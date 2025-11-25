import { findSpellParts } from "./spell";

const lines = await Bun.file("3.txt").text();

const input = lines.split(",").map(Number);

const spellParts = findSpellParts(input);

const TARGET = 202520252025000;

let min = 0;
let max = TARGET;

while (min != max) {
  const mid = Math.ceil((min + max) / 2);

  const blocks = spellParts.reduce(
    (sum, num) => sum + Math.floor(mid / num),
    0
  );

  if (blocks > TARGET) {
    max = mid - 1;
  } else {
    min = mid;
  }
}

console.log(min);
