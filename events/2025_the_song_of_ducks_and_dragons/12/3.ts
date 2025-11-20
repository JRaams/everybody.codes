import { findExplodedBarrels, convertGridToPPM } from "./barrel";

const lines = await Bun.file("3.txt").text();

const grid = lines.split("\n").map((x) => x.split("").map(Number));

function findBestPosition(alreadySeen: Set<string>) {
  let best = new Set<string>();

  for (let y = 0; y < grid.length; y++) {
    nextCell: for (let x = 0; x < grid[0].length; x++) {
      // Skip cell if a neighbour is higher
      for (const [dy, dx] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        if (
          grid[y + dy]?.[x + dx] !== undefined &&
          grid[y + dy][x + dx] > grid[y][x]
        ) {
          continue nextCell;
        }
      }

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
