import { Sword } from "./sword";

const lines = await Bun.file("1.txt").text();

const sword = new Sword(lines);

console.log(sword.quality);
