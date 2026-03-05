const input = await Bun.file("1.txt").text();

function parse(input: string) {
  let [py, px] = [0, 0];
  let grid: string[][] = [];

  const lines = input.trim().split("\n");
  for (let y = 0; y < lines.length; y++) {
    grid.push([]);
    for (let x = 0; x < lines[y].length; x++) {
      const c = lines[y][x];
      grid[y].push(c);

      if (c === "@") {
        [py, px] = [y, x];
      }
    }
  }

  return { grid, py, px };
}

let { grid, py, px } = parse(input);

const SEQUENCE = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let seqIndex = 0;
let steps = 0;

while (true) {
  const [dy, dx] = SEQUENCE[seqIndex % SEQUENCE.length];
  const [ny, nx] = [py + dy, px + dx];

  const c = grid[ny][nx];
  if (c === ".") {
    grid[py][px] = "+";
    [py, px] = [ny, nx];
    steps++;
  } else if (c === "#") {
    console.log(steps + 1);
    break;
  }

  seqIndex++;
}
