import { MinHeap } from "@datastructures-js/heap";

const lines = await Bun.file("1.txt").text();

// 1. Find walls
const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const walls: string[] = [];

let [dir, exitY, exitX] = [0, 0, 0];

lines.split(",").forEach((line) => {
  const direction = line.slice(0, 1);
  const steps = Number(line.slice(1));

  if (direction === "R") {
    dir = (dir + 1) % 4;
  } else if (direction === "L") {
    dir = (dir - 1 + 4) % 4;
  }

  const [dy, dx] = DIRS[dir];

  for (let i = 0; i < steps; i++) {
    exitY += dy;
    exitX += dx;
    walls.push(`${exitY},${exitX}`);
  }
});

// Remove wall on exit point
walls.pop();

// 2. Find shortest path
const queue = new MinHeap<[number, number, number]>(([elY, elX, elDist]) => {
  const manhattan = Math.abs(elY - exitY) + Math.abs(elX - exitX);
  return manhattan + elDist;
});
queue.push([0, 0, 0]);

const seen = new Set<string>();

while (!queue.isEmpty()) {
  const [py, px, distance] = queue.pop()!;

  if (seen.has(`${py},${px}`)) continue;
  seen.add(`${py},${px}`);

  if (py === exitY && px === exitX) {
    console.log(distance);
    break;
  }

  for (const [dy, dx] of DIRS) {
    const ny = py + dy;
    const nx = px + dx;

    if (walls.includes(`${ny},${nx}`)) continue;

    queue.push([ny, nx, distance + 1]);
  }
}
