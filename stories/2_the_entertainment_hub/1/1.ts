import { findFinalSlot } from "./index.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();

const [machineRaw, tokensRaw] = lines.trim().split("\n\n");
const machine = machineRaw!.split("\n").map((line) => line.split(""));

let total = 0;

tokensRaw!.split("\n").forEach((token, slot) => {
  const finalSlot = findFinalSlot(machine, token, slot);
  const coins = Math.max(0, (finalSlot * 2) - slot - 1)
  total += coins;
});

console.log(total)