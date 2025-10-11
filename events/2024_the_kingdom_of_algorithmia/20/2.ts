import { Directions, altChange, NextDirs, parse, type State } from "./glider";

const txt = await Bun.file("2.txt").text();

const { grid, checkpoints } = parse(txt);

function reachCheckpoint(start: string, end: string): number {
  const startCell = checkpoints.get(start)!;
  const endCell = checkpoints.get(end)!;

  const queue: State[] = [
    { x: startCell[0], y: startCell[1], alt: 10000, dir: "down", time: 0 },
  ];

  const seen = new Map<string, number>();

  while (queue.length > 0) {
    let { x, y, alt, dir, time } = queue.shift()!;

    const key = `${x},${y},${dir}`;

    if (seen.has(key) && seen.get(key)! >= alt) continue;
    seen.set(key, alt);

    if (x === endCell[0] && y === endCell[1]) {
      if (alt >= 10000) {
        return time;
      }
      continue;
    }

    const symbol = grid[y]?.[x];

    if (symbol === undefined || symbol === "#") continue;

    alt += altChange(symbol);

    for (const neighbour of NextDirs[dir]) {
      const [dx, dy] = Directions[neighbour];
      queue.push({ x: x + dx, y: y + dy, alt, dir: neighbour, time: time + 1 });
    }
  }

  return Infinity;
}

const result =
  reachCheckpoint("S", "A") +
  reachCheckpoint("A", "B") +
  reachCheckpoint("B", "C") +
  reachCheckpoint("C", "S");

console.log(result);
