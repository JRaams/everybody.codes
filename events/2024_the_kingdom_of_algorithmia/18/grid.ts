import { MinHeap } from "@datastructures-js/heap";

export function parse(txt: string) {
  const grid = txt.split("\n").map((x) => x.split(""));
  const allPalms = new Set<string>();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const symbol = grid[y][x];

      if (symbol === "P") {
        allPalms.add(`${x},${y}`);
      }
    }
  }

  return { grid, allPalms };
}

export function floodFarm(
  grid: string[][],
  palmsToFlood: Set<string>,
  startLocations: [x: number, y: number][]
): number[] {
  const queue = new MinHeap<[x: number, y: number, time: number]>((x) => x[2]);

  for (const [x, y] of startLocations) {
    queue.insert([x, y, 0]);
  }

  const palms = new Set<string>(palmsToFlood);
  const floodedAt = new Map<string, number>();

  while (!queue.isEmpty()) {
    const [x, y, time] = queue.pop()!;

    const key = `${x},${y}`;
    if (floodedAt.has(key) && floodedAt.get(key)! <= time) continue;
    floodedAt.set(key, time);

    if (grid[y]?.[x] === undefined || grid[y][x] === "#") continue;

    if (grid[y][x] === "P") {
      palms.delete(key);

      if (palms.size === 0) {
        break;
      }
    }

    queue.push([x + 1, y, time + 1]);
    queue.push([x - 1, y, time + 1]);
    queue.push([x, y + 1, time + 1]);
    queue.push([x, y - 1, time + 1]);
  }

  const floodTimes: number[] = [];

  palmsToFlood.forEach((key) => {
    floodTimes.push(floodedAt.get(key)!);
  });

  return floodTimes;
}
