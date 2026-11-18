const txt = await Bun.file("3.txt").text();

const grid = txt
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

function expandGrid(grid: string[][]): string[][] {
  const rows = grid.length;
  const cols = grid[0].length;

  const expanded = Array.from({ length: rows * 3 }, () =>
    Array<string>(cols * 3).fill("."),
  );

  // Direction, and the corresponding side midpoint within the 3×3 block.
  const sides = [
    { dx: 0, dy: -1, ex: 1, ey: 0 }, // up
    { dx: 1, dy: 0, ex: 2, ey: 1 }, // right
    { dx: 0, dy: 1, ex: 1, ey: 2 }, // down
    { dx: -1, dy: 0, ex: 0, ey: 1 }, // left
  ];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] !== "#") continue;

      const baseY = y * 3;
      const baseX = x * 3;

      // Four corners of this solid square.
      expanded[baseY][baseX] = "#";
      expanded[baseY][baseX + 2] = "#";
      expanded[baseY + 2][baseX] = "#";
      expanded[baseY + 2][baseX + 2] = "#";

      for (const { dx, dy, ex, ey } of sides) {
        const nx = x + dx;
        const ny = y + dy;

        // Mark the side midpoint if this side borders a gap or the map edge.
        if (grid[ny]?.[nx] === undefined || grid[ny][nx] === ".") {
          expanded[baseY + ey][baseX + ex] = "E";
        }
      }
    }
  }

  return expanded;
}

const expanded = expandGrid(grid);

const [endY, endX] = [expanded.length - 1, expanded[0].length - 1];

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
    const c = expanded[ny]?.[nx];
    if (c !== "#" && c !== "E") continue;

    const key = ny + "," + nx;
    if (seen.has(key)) continue;
    seen.add(key);

    const cost = c === "E" ? 1 : 0;
    queue.push([ny, nx, steps + cost]);
  }
}
