import { findFinalSlot } from "./index.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();

const [machineRaw, tokensRaw] = lines.trim().split("\n\n");
const machine = machineRaw!.split("\n").map((line) => line.split(""));
const SLOTS = machine[0].filter(x => x === '*').length;

let total = 0;

tokensRaw!.split("\n").forEach((token) => {
  let max = 0;

  for (let slot = 0; slot < SLOTS; slot++) {
    const finalSlot = findFinalSlot(machine, token, slot);
    const coins = Math.max(0, (finalSlot * 2) - slot - 1); 
    max = Math.max(max, coins)
  }

  total += max;
});

console.log(total)