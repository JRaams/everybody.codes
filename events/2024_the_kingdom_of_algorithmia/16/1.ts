import { parse } from "./cat";

const txt = await Bun.file("1.txt").text();

const { turns, sequences } = parse(txt);

let result = "";

for (let i = 0; i < turns.length; i++) {
  const turn = turns[i];
  const sequence = sequences[i];
  const index = (100 * turn) % sequence.length;
  result += sequence[index] + " ";
}

console.log(result);
