import { findEnergy, parsePlants } from "./plant";

const input = await Bun.file("3.txt").text();

// 1. Parse input
const [plantsRaw, testCasesRaw] = input.split("\n\n\n");

const plants = await parsePlants(plantsRaw);

const testCases = testCasesRaw.split("\n").map((x) => x.split(" ").map(Number));

// 2. Find maximum possible energy
const INPUT_COUNT = plants.filter((p) => p.branches.length === 0).length;

const bits = Array.from<number>({ length: INPUT_COUNT }).fill(0);

for (let i = INPUT_COUNT; i < plants.length; i++) {
  plants[i].branches.forEach((branch) => {
    if (branch.toID > INPUT_COUNT) return;

    if (branch.thickness > 0) {
      bits[branch.toID] = 1;
    }
  });
}

const maxEnergy = findEnergy(plants, bits);

// 3. Compare maximum with input testcases
let result = 0;

for (const testCase of testCases) {
  const energy = findEnergy(plants, testCase);

  if (energy > 0) {
    result += maxEnergy - energy;
  }
}

console.log(result);
