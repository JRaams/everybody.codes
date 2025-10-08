import { floodFarm, parse } from "./grid";

const txt = await Bun.file("3.txt").text();

const { grid, allPalms } = parse(txt);

let minSum = Infinity;

allPalms.forEach((palm) => {
  const [x, y] = palm.split(",").map(Number);

  for (const [dx, dy] of [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]) {
    const nx = x + dx;
    const ny = y + dy;
    if (grid[ny]?.[nx] !== ".") continue;

    const floodTimes = floodFarm(grid, allPalms, [[nx, ny]]);
    const sum = floodTimes.reduce((acc, time) => acc + time, 0);

    if (sum < minSum) {
      minSum = sum;
    }
  }
});

console.log(minSum);
