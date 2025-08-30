import { findFinalSlot } from "./index.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();

const [machineRaw, tokensRaw] = lines.trim().split("\n\n");
const machine = machineRaw!.split("\n").map((line) => line.split(""));

const slotCount = machine[0].filter((x) => x === "*").length;
const scores = new Map<number, Map<number, number>>();

tokensRaw!.split("\n").forEach((token, i) => {
  scores.set(i, new Map<number, number>());

  for (let slot = 0; slot < slotCount; slot++) {
    const finalSlot = findFinalSlot(machine, token, slot);
    const coins = Math.max(0, finalSlot * 2 - slot - 1);
    scores.get(i)!.set(slot, coins);
  }
});

function findLimit(
  scores: Map<number, Map<number, number>>,
  token: number,
  usedSlots: number,
  getMin: boolean,
  cache: Map<string, number>
): number {
  if (!scores.has(token)) return 0;

  const key = `${token},${usedSlots}`;
  if (cache.has(key)) return cache.get(key)!;

  let result = getMin ? Number.MAX_SAFE_INTEGER : 0;

  for (const slot of scores.get(token)!.keys()) {
    if (usedSlots & (1 << slot)) continue;

    const newUsed = usedSlots | (1 << slot);

    const score =
      findLimit(scores, token + 1, newUsed, getMin, cache) +
      scores.get(token)!.get(slot)!;

    if (getMin) {
      result = Math.min(result, score);
    } else {
      result = Math.max(result, score);
    }
  }

  cache.set(key, result);
  return result;
}

const max = findLimit(scores, 0, 0, false, new Map<string, number>());

const min = findLimit(scores, 0, 0, true, new Map<string, number>());

console.log(min, max);
