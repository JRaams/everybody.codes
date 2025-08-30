import { Dice } from "./dice";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [diceRaw, trackRaw] = lines.trim().split("\n\n");
const dices = diceRaw.split("\n").map(Dice.fromInput);

const results: { id: number; end: number }[] = [];

dices.forEach((dice, i) => {
  const track = trackRaw.split("").map(Number);

  for (let turn = 1; ; turn++) {
    if (dice.roll() === track[0]) {
      track.shift();
    }

    if (track.length === 0) {
      results.push({ id: i + 1, end: turn });
      break;
    }
  }
});

results.sort((a, b) => a.end - b.end);

console.log(results.map((x) => x.id).join(","));
