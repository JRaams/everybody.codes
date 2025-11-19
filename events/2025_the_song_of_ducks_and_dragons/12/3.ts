import { findExplodedBarrels, convertGridToPPM } from "./barrel";

const lines = await Bun.file("3.txt").text();

const grid = lines.split("\n").map((x) => x.split("").map(Number));

function findBestPosition(alreadySeen: Set<string>) {
  let best = new Set<string>();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] < 2) continue;

      const barrels = findExplodedBarrels(grid, y, x, alreadySeen);

      if (barrels.size > best.size) {
        best = barrels;
      }
    }
  }

  return best;
}

const first = findBestPosition(new Set());

const second = findBestPosition(first);

const third = findBestPosition(second);

console.log(third.size);

await convertGridToPPM(grid, third, 3);
