import { findFinalSlot } from "./index.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();

const [machineRaw, tokensRaw] = lines.trim().split("\n\n");
const machine = machineRaw!.split("\n").map((line) => line.split(""));

const SLOTS = machine[0].filter(x => x === '*').length;
const allResults: number[][] = [];

tokensRaw!.split("\n").forEach((token) => {
  const results: number[] = [];

  for (let slot = 0; slot < SLOTS; slot++) {
    const finalSlot = findFinalSlot(machine, token, slot);
    const coins = Math.max(0, (finalSlot * 2) - slot - 1); 
    results.push(coins);
  }

  allResults.push(results);
});

function* permute(perm: number[], pos: number, options: number[], used: Set<number>): Generator<number[]> {
  if (pos === perm.length) {
    yield [...perm];
  } else {
    for (let i = 0; i < options.length; i++) {
      if (!used.has(options[i]!)) {
        used.add(options[i]!);
        perm[pos] = options[i]!;
        yield* permute(perm, pos + 1, options, used);
        used.delete(options[i]!);
      }
    }
  }
}


let min = Number.MAX_SAFE_INTEGER;
let max = 0;

for (const p of permute(Array(6).fill(-1), 0, Array(SLOTS).fill(0).map((_, i) => i), new Set())) {
  let total = 0;
  for (let i = 0; i < 6; i++) {
    total += allResults[i][p[i]];
  }

  min = Math.min(min, total);
  max = Math.max(max, total);
}

console.log(min, max);
