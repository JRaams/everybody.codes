import { parse, simulate, countActive } from "./floor";

const pattern = await parse("3.txt");

function matchesPattern(grid: string[][], pattern: string[][]): boolean {
  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[y].length; x++) {
      if (grid[y + 13][x + 13] !== pattern[y][x]) {
        return false;
      }
    }
  }
  return true;
}

let grid: string[][] = [];
for (let y = 0; y < 34; y++) {
  grid.push([]);
  for (let x = 0; x < 34; x++) {
    grid[y].push(".");
  }
}

const seen = new Set<string>();

let result = 0;
let foundCycle = false;

for (let round = 0; round < 1000000000; round++) {
  grid = simulate(grid);

  if (matchesPattern(grid, pattern)) {
    result += countActive(grid);
  }

  if (foundCycle) continue;

  const key = grid.join("");

  if (seen.has(key)) {
    const cycleCount = Math.floor(1000000000 / round);
    result = cycleCount * result;
    round = cycleCount * round;
    foundCycle = true;
    seen.clear();
  } else {
    seen.add(key);
  }
}

console.log(result);
