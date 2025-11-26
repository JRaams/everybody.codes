import { MinHeap } from "@datastructures-js/heap";

export async function parse(fileName: string) {
  const input = await Bun.file(fileName).text();
  const lines = input.split("\n");

  const grid: number[][] = [];
  let volcano: Cell = { y: 0, x: 0 };
  let start: Cell = { y: 0, x: 0 };

  for (let y = 0; y < lines.length; y++) {
    grid.push([]);

    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x];
      if (char === "@") {
        volcano = { y, x };
        grid[y].push(0);
      } else if (char === "S") {
        start = { y, x };
        grid[y].push(0);
      } else {
        grid[y].push(Number(char));
      }
    }
  }

  return { grid, volcano, start };
}

export function applyLava(grid: number[][], volcano: Cell, radius: number) {
  const newGrid = structuredClone(grid);
  let destroyed = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const ry = (volcano.y - y) ** 2;
      const rx = (volcano.x - x) ** 2;
      const r2 = radius ** 2;

      if (rx + ry <= r2) {
        if (newGrid[y][x] === Infinity) continue;
        destroyed += grid[y][x];
        newGrid[y][x] = Infinity;
      }
    }
  }

  return { newGrid, destroyed };
}

export function findMinTimes(grid: number[][], start: Cell) {
  const minTimes = new Map<string, number>();

  const queue = new MinHeap<[number, number, number]>(([_y, _x, time]) => time);

  queue.push([start.y, start.x, 0]);

  while (!queue.isEmpty()) {
    const [y, x, time] = queue.pop()!;

    if (minTimes.has(`${y},${x}`) && minTimes.get(`${y},${x}`)! <= time) {
      continue;
    }
    minTimes.set(`${y},${x}`, time);

    for (const [dy, dx] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      const ny = y + dy;
      const nx = x + dx;

      if (grid[ny]?.[nx] === undefined) continue;
      if (grid[ny][nx] === Infinity) continue;

      queue.push([ny, nx, time + grid[ny][nx]]);
    }
  }

  return minTimes;
}

type Cell = {
  y: number;
  x: number;
};
