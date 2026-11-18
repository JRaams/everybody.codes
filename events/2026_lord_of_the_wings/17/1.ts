const txt = await Bun.file("1.txt").text();

const grid = txt
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const [endY, endX] = [grid.length - 1, grid[0].length - 1];

const queue: [number, number, number][] = [[0, 0, 0]];
const seen = new Set<string>(["0,0"]);

while (queue.length > 0) {
  const [y, x, steps] = queue.shift()!;

  if (y === endY && x === endX) {
    console.log(steps);
    break;
  }

  for (const [DY, DX] of [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]) {
    const [ny, nx] = [y + DY, x + DX];
    const c = grid[ny]?.[nx];
    if (c !== "#") continue;

    const key = ny + "," + nx;
    if (seen.has(key)) continue;
    seen.add(key);

    queue.push([ny, nx, steps + 1]);
  }
}
