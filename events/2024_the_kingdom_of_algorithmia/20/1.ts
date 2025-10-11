import { Directions, altChange, NextDirs, parse, type State } from "./glider";

const txt = await Bun.file("1.txt").text();

const { grid, checkpoints } = parse(txt);

const startX = checkpoints.get("S")![0];

const queue: State[] = [{ x: startX, y: 0, alt: 1000, dir: "down", time: 0 }];

const seen = new Map<string, number>();

let result = 0;

while (queue.length > 0) {
  let { x, y, alt, dir, time } = queue.shift()!;

  const key = `${x},${y},${dir}`;

  if (seen.has(key) && seen.get(key)! >= alt) continue;
  seen.set(key, alt);

  const symbol = grid[y]?.[x];

  if (symbol === undefined || symbol === "#") continue;

  alt += altChange(symbol);

  if (time === 100) {
    result = Math.max(result, alt);
    continue;
  }

  for (const nextDir of NextDirs[dir]) {
    const [dx, dy] = Directions[nextDir];
    queue.push({ x: x + dx, y: y + dy, alt, dir: nextDir, time: time + 1 });
  }
}

console.log(result + 1);
