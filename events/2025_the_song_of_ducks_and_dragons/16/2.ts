import { findSpellParts } from "./spell";

const lines = await Bun.file("2.txt").text();

const input = lines.split(",").map(Number);

const spellParts = findSpellParts(input);

const product = spellParts.reduce((product, num) => product * num, 1);

console.log(product);
