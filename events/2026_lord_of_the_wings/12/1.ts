import { minimumSpells } from "./stackrog";

const input = await Bun.file("1.txt").text();

console.log(minimumSpells(input));
