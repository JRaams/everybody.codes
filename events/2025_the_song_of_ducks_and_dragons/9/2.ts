import { parse, findFamilies, calculateSimilarity } from "./dna";

const input = await parse("2.txt");

const families = findFamilies(input);

const sum = families.reduce((a, b) => a + calculateSimilarity(input, b), 0);

console.log(sum);
