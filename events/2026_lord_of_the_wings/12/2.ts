import { minimumSpells } from "./stackrog";

const input = await Bun.file("2.txt").text();

console.log(minimumSpells(input));
