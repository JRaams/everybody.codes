const txt = await Bun.file("1.txt").text();

const grid = txt.split("\n").map((line) => line.split(""));

let y = 0;
let x = grid[0].findIndex((char) => char === ".");

const queue = [[x, y, 0]];
const seen = new Set<string>();

while (queue.length > 0) {
  const [x, y, distance] = queue.shift()!;

  if (seen.has(`${x},${y}`)) continue;
  seen.add(`${x},${y}`);

  if (grid[y][x] === "H") {
    console.log(2 * distance);
    break;
  }

  for (const [dx, dy] of [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]) {
    const nx = x + dx;
    const ny = y + dy;

    if (grid[ny]?.[nx] === undefined) continue;
    if (grid[ny][nx] === "#") continue;

    queue.push([nx, ny, distance + 1]);
  }
}
