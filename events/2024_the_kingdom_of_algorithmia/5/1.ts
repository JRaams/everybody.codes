import { Clapper } from "./clapper";

const input = await Bun.file("1.txt").text();

const clapper = new Clapper(input);

let shout = 0;

for (let round = 0; round < 10; round++) {
  shout = clapper.clap();
}

console.log(shout);
