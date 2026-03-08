const input = await Bun.file("3.txt").text();

function parse(input: string) {
  let [py, px] = [0, 0];
  let grid: string[][] = [];
  const bones: [number, number][] = [];

  const PADDING = 20;

  const lines = input.trim().split("\n");
  for (let y = 0; y < lines.length; y++) {
    grid.push([]);

    for (let x = 0; x < PADDING; x++) {
      grid[y].push(".");
    }

    for (let x = 0; x < lines[y].length; x++) {
      const c = lines[y][x];
      grid[y].push(c);

      if (c === "@") {
        [py, px] = [y, x];
      } else if (c === "#") {
        bones.push([y, x]);
      }
    }

    for (let x = 0; x < PADDING; x++) {
      grid[y].push(".");
    }
  }

  for (let y = 0; y < PADDING; y++) {
    let pre: string[] = [];
    let post: string[] = [];

    for (let x = 0; x < lines[y].length + PADDING * 2; x++) {
      pre.push(".");
      post.push(".");
    }

    grid.unshift(pre);
    grid.push(post);
  }

  py += PADDING;
  px += PADDING;

  for (let i = 0; i < bones.length; i++) {
    bones[i][0] += PADDING;
    bones[i][1] += PADDING;
  }

  return { grid, py, px, bones };
}

let { grid, py, px, bones } = parse(input);

function prefill() {
  const clone = structuredClone(grid);
  let queue: [number, number][] = [[0, 0]];

  while (queue.length > 0) {
    const [y, x] = queue.shift()!;

    if (clone[y]?.[x] === undefined) continue;
    if (clone[y][x] !== ".") continue;
    clone[y][x] = "#";

    queue.push([y - 1, x], [y, x + 1], [y + 1, x], [y, x - 1]);
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (clone[y][x] === ".") {
        grid[y][x] = "+";
      }
    }
  }
}

// console.log(grid.map((x) => x.join("")).join("\n"));
prefill();
// console.log(grid.map((x) => x.join("")).join("\n"));

const SEQUENCE = [
  [-1, 0],
  [-1, 0],
  [-1, 0],

  [0, 1],
  [0, 1],
  [0, 1],

  [1, 0],
  [1, 0],
  [1, 0],

  [0, -1],
  [0, -1],
  [0, -1],
];
let seqIndex = 0;
let steps = 0;

function areBonesSurrounded(): boolean {
  return bones.every(([by, bx]) =>
    [
      [by - 1, bx],
      [by, bx + 1],
      [by + 1, bx],
      [by, bx - 1],
    ].every(([y, x]) => {
      const c = grid[y][x];
      return c === "+" || c === "#";
    }),
  );
}

while (true) {
  const [dy, dx] = SEQUENCE[seqIndex % SEQUENCE.length];
  const [ny, nx] = [py + dy, px + dx];

  const c = grid[ny]?.[nx];
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
      }
    }
  }

  if (areBonesSurrounded()) {
    console.log(steps);
    break;
  }

  seqIndex++;
}
