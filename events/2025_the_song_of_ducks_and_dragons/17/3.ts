import { applyLava, findMinTimes, parse } from "./vulcano";

const { grid, volcano, start } = await parse("3.txt");

let workingGrid = structuredClone(grid);

for (let R = 1; ; R++) {
  const { newGrid, destroyed } = applyLava(workingGrid, volcano, R);

  if (destroyed === 0) break;

  workingGrid = newGrid;

  // Find times around the left side of the volcano
  for (let x = volcano.x + 1; x < workingGrid[0].length; x++) {
    workingGrid[volcano.y][x] = Infinity;
  }

  const leftTimes = findMinTimes(workingGrid, start);

  for (let x = volcano.x + 1; x < workingGrid[0].length; x++) {
    workingGrid[volcano.y][x] = grid[volcano.y][x];
  }

  // Find times around the right side of the volcano
  for (let x = 0; x < volcano.x - 1; x++) {
    workingGrid[volcano.y][x] = Infinity;
  }

  const rightTimes = findMinTimes(workingGrid, start);

  for (let x = 0; x < volcano.x - 1; x++) {
    workingGrid[volcano.y][x] = grid[volcano.y][x];
  }

  // Combine the times around the volcano
  let minTime = Infinity;

  leftTimes.entries().forEach(([cell, leftTime]) => {
    const [y, x] = cell.split(",").map(Number);
    if (y <= volcano.y) return;
    if (x !== volcano.x) return;
    if (!rightTimes.has(cell)) return;

    const totalTime = leftTime + rightTimes.get(cell)! - grid[y][volcano.x];

    if (minTime > totalTime) {
      minTime = totalTime;
    }
  });

  const volcanoTime = (R + 1) * 30;

  if (minTime < volcanoTime) {
    console.log(R * minTime);
    break;
  }
}
