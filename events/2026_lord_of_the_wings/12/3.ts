import { minimumSpells } from "./stackrog";

const input = await Bun.file("3.txt").text();

console.log(minimumSpells(input));
