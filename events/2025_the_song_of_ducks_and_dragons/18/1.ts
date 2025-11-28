import { parsePlants, simulatePlants } from "./plant";

const input = await Bun.file("1.txt").text();

const plants = await parsePlants(input);

simulatePlants(plants);

console.log(plants.at(-1)?.energy);
