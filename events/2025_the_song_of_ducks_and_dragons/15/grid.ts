export function findShortestPath(input: string): number {
  const { walls, ys, xs, end } = findBlocks(input);

  const { grid, mappedStart, mappedEnd } = shrinkGrid(walls, ys, xs, end);

  const queue: [y: number, x: number, distance: number][] = [
    [mappedStart[0], mappedStart[1], 0],
  ];

  const seen = new Set<string>();

  while (queue.length > 0) {
    const [fromY, fromX, distance] = queue.shift()!;

    if (fromY === mappedEnd[0] && fromX === mappedEnd[1]) {
      return distance;
    }

    const key = `${fromY},${fromX}`;
    if (seen.has(key)) continue;
    seen.add(key);

    for (const [dy, dx] of DIRS) {
      const [toY, toX] = [fromY + dy, fromX + dx];

      if (grid[toY]?.[toX] === ".") {
        const manhattan =
          Math.abs(ys[fromY] - ys[toY]) + Math.abs(xs[fromX] - xs[toX]);

        queue.push([toY, toX, distance + manhattan]);
      }
    }
  }

  throw new Error("No path found");
}

// Credits to maneatingape for their solution using grid compression
// https://github.com/maneatingape/everybody-codes-rust/blob/fd472dfedce58fe4ec827dd94e09643b4f960ea8/src/event2025/quest15.rs
function findBlocks(input: string) {
  const walls: Wall[] = [];
  const uniquey = new Set<number>([-1, 0, 1]);
  const uniquex = new Set<number>([-1, 0, 1]);

  let [dir, endY, endX] = [0, 0, 0];

  input.split(",").forEach((line) => {
    const direction = line.slice(0, 1);
    const steps = Number(line.slice(1));

    if (direction === "R") {
      dir = (dir + 1) % 4;
    } else if (direction === "L") {
      dir = (dir - 1 + 4) % 4;
    }

    const [prevy, prevx] = [endY, endX];

    const [dy, dx] = DIRS[dir];
    endY += dy * steps;
    endX += dx * steps;

    walls.push([
      [prevy, prevx],
      [endY, endX],
    ]);

    [endY - 1, endY, endY + 1].forEach((ny) => uniquey.add(ny));
    [endX - 1, endX, endX + 1].forEach((nx) => uniquex.add(nx));
  });

  const ys = Array.from(uniquey).sort((a, b) => a - b);
  const xs = Array.from(uniquex).sort((a, b) => a - b);

  return { walls, ys, xs, end: [endY, endX] as Cell };
}

function shrinkGrid(walls: Wall[], ys: number[], xs: number[], end: Cell) {
  const yMap = new Map<number, number>();
  const xMap = new Map<number, number>();

  for (let i = 0; i < ys.length; i++) {
    yMap.set(ys[i], i);
  }
  for (let i = 0; i < xs.length; i++) {
    xMap.set(xs[i], i);
  }

  const grid = Array.from({ length: ys.length }, () =>
    Array.from({ length: xs.length }, () => ".")
  );

  for (const [from, to] of walls) {
    let [y1, y2] = [yMap.get(from[0])!, yMap.get(to[0])!];
    let [x1, x2] = [xMap.get(from[1])!, xMap.get(to[1])!];

    if (y1 > y2) [y1, y2] = [y2, y1];
    if (x1 > x2) [x1, x2] = [x2, x1];

    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        grid[y][x] = "#";
      }
    }
  }

  const mappedStart = [yMap.get(0)!, xMap.get(0)!] as Cell;
  const mappedEnd = [yMap.get(end[0])!, xMap.get(end[1])!] as Cell;

  grid[mappedEnd[0]][mappedEnd[1]] = ".";

  return { grid, mappedStart, mappedEnd };
}

type Cell = [number, number];

type Wall = [Cell, Cell];

const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
