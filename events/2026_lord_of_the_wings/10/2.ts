const input = await Bun.file("2.txt").text();

const grid = input
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
] as const;

type Ghost = {
  x: number;
  y: number;
  dir: 0 | 1 | 2 | 3;
  collisions: number;
};

let ghosts: Ghost[] = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];

    if (c === ">") {
      ghosts.push({ y, x, dir: 0, collisions: 0 });
      grid[y][x] = ".";
    } else if (c === "v") {
      ghosts.push({ y, x, dir: 1, collisions: 0 });
      grid[y][x] = ".";
    } else if (c === "<") {
      ghosts.push({ y, x, dir: 2, collisions: 0 });
      grid[y][x] = ".";
    } else if (c === "^") {
      ghosts.push({ y, x, dir: 3, collisions: 0 });
      grid[y][x] = ".";
    }
  }
}

const LIMIT = 10000;

function simulate(): void {
  ghosts.forEach((ghost) => {
    const { y, x, dir } = ghost;
    const [DY, DX] = DIRS[dir];

    const [ny, nx] = [y + DY, x + DX];

    if (grid[ny][nx] === "#") {
      ghost.collisions++;
      ghost.dir++;
      ghost.dir %= 4;
    } else if (grid[ny][nx] === ".") {
      ghost.y += DY;
      ghost.x += DX;
    }
  });

  ghosts = ghosts.filter((g) => g.collisions < LIMIT);

  const toTurnAround = new Set<number>();

  for (let i = 0; i < ghosts.length - 1; i++) {
    for (let j = i + 1; j < ghosts.length; j++) {
      const a = ghosts[i];
      const b = ghosts[j];
      if (a.y === b.y && a.x === b.x) {
        toTurnAround.add(i);
        toTurnAround.add(j);
      }
    }
  }

  toTurnAround.forEach((i) => {
    const ghost = ghosts[i];

    ghost.dir += 2;
    ghost.dir %= 4;
    ghost.collisions++;
  });

  ghosts = ghosts.filter((g) => g.collisions < LIMIT);
}

for (let i = 0; ; i++) {
  simulate();

  if (ghosts.length === 0) {
    console.log(i + 1);
    break;
  }
}
