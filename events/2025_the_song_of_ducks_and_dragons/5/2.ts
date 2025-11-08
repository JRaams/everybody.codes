import { Sword } from "./sword";

const lines = await Bun.file("2.txt").text();

const swords = lines.split("\n").map((line) => new Sword(line));

const qualities = swords.map((sword) => sword.quality);

qualities.sort((a, b) => b - a);

console.log(qualities[0] - qualities[qualities.length - 1]);
