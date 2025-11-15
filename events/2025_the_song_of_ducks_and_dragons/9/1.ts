import { parse, findFamilies, calculateSimilarity } from "./dna";

const input = await parse("1.txt");

const families = findFamilies(input);

const similarity = calculateSimilarity(input, families[0]);

console.log(similarity);
