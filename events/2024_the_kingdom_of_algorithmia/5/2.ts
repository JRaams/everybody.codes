import { Clapper } from "./clapper";

const input = await Bun.file("2.txt").text();

const clapper = new Clapper(input);

let count = new Map<number, number>();

for (let round = 1; ; round++) {
  const shout = clapper.clap();

  let occurrences = count.get(shout) ?? 0;
  occurrences++;

  count.set(shout, occurrences);

  if (occurrences === 2024) {
    console.log(shout * round);
    break;
  }
}
