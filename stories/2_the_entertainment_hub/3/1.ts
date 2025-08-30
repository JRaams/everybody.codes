import { Dice } from "./dice";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("\n");
const dices = input.map(Dice.fromInput);

let total = 0;

for (let roll_number = 1; ; roll_number++) {
  dices.forEach((d) => {
    total += d.roll();
  });

  if (total >= 10000) {
    console.log(roll_number);
    break;
  }
}
