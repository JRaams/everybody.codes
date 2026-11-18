const txt = await Bun.file("2.txt").text();

const grid = txt
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const queue: [number, number][] = [[0, 0]];
const seen = new Set<string>(["0,0"]);
let units = 0;

while (queue.length > 0) {
  const [y, x] = queue.shift()!;

  for (const [DY, DX] of [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]) {
    const [ny, nx] = [y + DY, x + DX];
    const c = grid[ny]?.[nx];

    if (c !== "#") {
      units++;
      continue;
    }

    const key = ny + "," + nx;
    if (seen.has(key)) continue;
    seen.add(key);

    queue.push([ny, nx]);
  }
}

console.log(units);
