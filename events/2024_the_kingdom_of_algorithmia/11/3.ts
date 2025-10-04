import { defaultDict } from "../../../util/defaultdict";

const txt = await Bun.file("3.txt").text();

const conversionMap = new Map<string, string[]>();

txt.split("\n").forEach((line) => {
  const [key, value] = line.split(":");
  conversionMap.set(key, value.split(","));
});

let min = Infinity;
let max = -Infinity;

conversionMap.keys().forEach((initial) => {
  let current = defaultDict(() => 0);
  current[initial] = 1;
  let next = defaultDict(() => 0);

  for (let day = 0; day < 20; day++) {
    for (const [termites, count] of Object.entries(current)) {
      const conversions = conversionMap.get(termites)!;

      conversions.forEach((t) => {
        next[t] += count;
      });
    }

    current = { ...next };
    next = defaultDict(() => 0);
  }

  const total = Object.values(current).reduce((acc, curr) => acc + curr, 0);

  min = Math.min(min, total);
  max = Math.max(max, total);
});

console.log(max - min);
