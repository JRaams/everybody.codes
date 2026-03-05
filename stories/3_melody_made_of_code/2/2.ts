const input = await Bun.file("2.txt").text();

function parse(input: string) {
  let [py, px] = [0, 0];
  let [by, bx] = [0, 0];
  let grid: string[][] = [];

  const lines = input.trim().split("\n");
  for (let y = 0; y < lines.length; y++) {
    grid.push([]);

    for (let x = 0; x < lines[y].length; x++) {
      grid[y].push(".");
    }

    for (let x = 0; x < lines[y].length; x++) {
      const c = lines[y][x];
      grid[y].push(c);

      if (c === "@") {
        [py, px] = [y, x];
      } else if (c === "#") {
        [by, bx] = [y, x];
      }
    }

    for (let x = 0; x < lines[y].length; x++) {
      grid[y].push(".");
    }
  }

  for (let y = 0; y < lines.length; y++) {
    let pre: string[] = [];
    let post: string[] = [];

    for (let x = 0; x < lines[y].length * 3; x++) {
      pre.push(".");
      post.push(".");
    }

    grid.unshift(pre);
    grid.push(post);
  }

  py += lines.length;
  by += lines.length;
  px += lines[0].length;
  bx += lines[0].length;

  return { grid, py, px, by, bx };
}

let { grid, py, px, by, bx } = parse(input);

const SEQUENCE = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let seqIndex = 0;
let steps = 0;

function isBoneSurrounded(): boolean {
  return [
    [by - 1, bx],
    [by, bx + 1],
    [by + 1, bx],
    [by, bx - 1],
  ].every(([y, x]) => grid[y][x] === "+");
}

while (true) {
  const [dy, dx] = SEQUENCE[seqIndex % SEQUENCE.length];
  const [ny, nx] = [py + dy, px + dx];

  const c = grid[ny][nx];
  if (c === ".") {
    grid[py][px] = "+";
    grid[ny][nx] = "@";
    [py, px] = [ny, nx];
    steps++;

    flood: for (const [fy, fx] of [
      [py - 1, px],
      [py, px + 1],
      [py + 1, px],
      [py, px - 1],
    ]) {
      const nextGrid = structuredClone(grid);

      const queue: [number, number][] = [[fy, fx]];
      let changes = 0;

      while (queue.length > 0) {
        const [y, x] = queue.shift()!;
        const c = nextGrid[y]?.[x];

        if (c === undefined) {
          continue flood;
        }

        if (c !== ".") continue;
        nextGrid[y][x] = "+";
        changes++;

        queue.push([y - 1, x], [y, x + 1], [y + 1, x], [y, x - 1]);
      }

      if (changes > 0) {
        grid = nextGrid;
        break flood;
      }
    }
  } else if (c === undefined) {
    grid[ny][nx] = ".";
    continue;
  }

  if (isBoneSurrounded()) {
    console.log("surrounded", steps - 1);
    break;
  }

  seqIndex++;
}
