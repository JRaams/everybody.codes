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
  let populationPerType = defaultDict(() => 0);
  populationPerType[initial] = 1;

  let nextGeneration = defaultDict(() => 0);

  for (let day = 0; day < 20; day++) {
    for (const [type, population] of Object.entries(populationPerType)) {
      const conversions = conversionMap.get(type)!;

      conversions.forEach((nextType) => {
        nextGeneration[nextType] += population;
      });
    }

    populationPerType = { ...nextGeneration };
    nextGeneration = defaultDict(() => 0);
  }

  const total = Object.values(populationPerType).reduce((a, b) => a + b, 0);

  min = Math.min(min, total);
  max = Math.max(max, total);
});

console.log(max - min);
