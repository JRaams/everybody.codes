import { parse } from "./thread";

const pairs = await parse("1.txt");

const result = pairs.filter(([a, b]) => b - a === 16).length;

console.log(result);
