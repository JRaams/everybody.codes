import { Clapper } from "./clapper";

const input = await Bun.file("3.txt").text();

const clapper = new Clapper(input);

let highestShout = 0;
let seen = new Set<string>();

while (true) {
  const shout = clapper.clap();
  highestShout = Math.max(highestShout, shout);

  const hash = clapper.getHash();
  if (seen.has(hash)) break;
  seen.add(hash);
}

console.log(highestShout);
