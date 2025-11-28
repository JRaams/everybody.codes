import { findEnergy, parsePlants } from "./plant";

const input = await Bun.file("2.txt").text();

const [plantsRaw, testCasesRaw] = input.split("\n\n\n");

const plants = await parsePlants(plantsRaw);

const testCases = testCasesRaw.split("\n").map((x) => x.split(" ").map(Number));

const result = testCases.reduce((sum, tc) => sum + findEnergy(plants, tc), 0);

console.log(result);
