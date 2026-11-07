const input = await Bun.file("1.txt").text();

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
};

const ghosts: Ghost[] = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];

    if (c === ">") {
      ghosts.push({ y, x, dir: 0 });
      grid[y][x] = ".";
    } else if (c === "v") {
      ghosts.push({ y, x, dir: 1 });
      grid[y][x] = ".";
    } else if (c === "<") {
      ghosts.push({ y, x, dir: 2 });
      grid[y][x] = ".";
    } else if (c === "^") {
      ghosts.push({ y, x, dir: 3 });
      grid[y][x] = ".";
    }
  }
}

function simulate(): number {
  let collisions = 0;

  ghosts.forEach((ghost) => {
    const { y, x, dir } = ghost;
    const [DY, DX] = DIRS[dir];

    const [ny, nx] = [y + DY, x + DX];

    if (grid[ny][nx] === "#") {
      collisions++;
      ghost.dir++;
      ghost.dir %= 4;
    } else if (grid[ny][nx] === ".") {
      ghost.y += DY;
      ghost.x += DX;
    }
  });

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
    collisions++;
  });

  return collisions;
}

let totalCollisions = 0;

for (let i = 0; i < 10; i++) {
  totalCollisions += simulate();
}

console.log(totalCollisions);
