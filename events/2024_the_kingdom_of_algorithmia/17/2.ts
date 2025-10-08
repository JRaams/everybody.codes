import { calculateConstellationSize, parse } from "./stars";

const txt = await Bun.file("2.txt").text();
const stars = parse(txt);

const result = calculateConstellationSize(stars);

console.log(result);
