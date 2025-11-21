import { parse, simulate, countActive } from "./floor";

const input = await parse("1.txt");

let grid = input;
let result = 0;

for (let round = 0; round < 10; round++) {
  grid = simulate(grid);
  result += countActive(grid);
}

console.log(result);
