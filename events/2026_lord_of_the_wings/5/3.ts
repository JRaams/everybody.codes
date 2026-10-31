const lines = await Bun.file("3.txt").text();

const grid = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const middleY = Math.floor(grid.length / 2);
const middleX = Math.floor(grid[0].length / 2);

grid[middleY][middleX] = "#";

const queue = new Set<string>();
queue.add(middleY + "-" + middleX);

// 1. Land cells

while (true) {
  const neighbours: [number, number][] = [];

  const toChange: [number, number][] = [];

  queue.forEach((entry) => {
    const [y, x] = entry.split("-").map(Number);

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const ny = y + dy;
        const nx = x + dx;

        if (grid[ny]?.[nx] && grid[ny][nx] !== "#") {
          neighbours.push([ny, nx]);
        }
      }
    }
  });

  for (const [y, x] of neighbours) {
    let land = 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dy === 0 && dx === 0) continue;

        const c = grid[y + dy]?.[x + dx];
        if (c === "#" || c === "1") {
          land++;
        }
      }
    }

    if (land >= 5) {
      queue.add(y + "-" + x);
      toChange.push([y, x]);
    }
  }

  if (toChange.length === 0) {
    break;
  }

  for (const [y, x] of toChange) {
    grid[y][x] = "#";
  }
}

// 2. Outside sand

queue.clear();

for (let y = 0; y < grid.length; y++) {
  nextLand: for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] !== "#") continue;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const ny = y + dy;
        const nx = x + dx;

        if (grid[ny]?.[nx] !== "#") {
          queue.add(y + "-" + x);
          continue nextLand;
        }
      }
    }
  }
}

for (const entry of queue) {
  const [y, x] = entry.split("-").map(Number);
  grid[y][x] = "=";
}

// 3. Propagate sand

while (true) {
  const neighbours: [number, number][] = [];

  const toChange: [number, number][] = [];

  queue.forEach((entry) => {
    const [y, x] = entry.split("-").map(Number);

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const ny = y + dy;
        const nx = x + dx;

        if (grid[ny]?.[nx] && grid[ny][nx] === "#") {
          neighbours.push([ny, nx]);
        }
      }
    }
  });

  for (const [y, x] of neighbours) {
    let sand = 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dy === 0 && dx === 0) continue;

        const c = grid[y + dy]?.[x + dx];
        if (c === "=") {
          sand++;
        }
      }
    }

    if (sand >= 5) {
      queue.add(y + "-" + x);
      toChange.push([y, x]);
    }
  }

  if (toChange.length === 0) {
    break;
  }

  for (const [y, x] of toChange) {
    grid[y][x] = "=";
  }
}

// 4. Place trees
const treePattern = [
  [-2, -1],
  [-2, 0],
  [-2, 1],

  [-1, -2],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [-1, 2],

  [0, -2],
  [0, -1],
  [0, 1],
  [0, 2],

  [1, -2],
  [1, -1],
  [1, 0],
  [1, 1],
  [1, 2],

  [2, -1],
  [2, 0],
  [2, 1],
];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] !== "#") continue;

    const canPlant = treePattern.every(([dy, dx]) => {
      const [ny, nx] = [y + dy, x + dx];
      const c = grid[ny]?.[nx];
      return c === "#" || c === "@";
    });

    if (canPlant) {
      grid[y][x] = "@";
    }
  }
}

// 5. Propagate trees

for (let step = 1; step <= 2; step++) {
  const toChange: [number, number][] = [];

  for (let y = 0; y < grid.length; y++) {
    nextLand: for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== "#") continue;

      let trees = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dy === 0 && dx === 0) continue;

          const c = grid[y + dy]?.[x + dx];

          if (c === "=") {
            continue nextLand;
          } else if (c === "@") {
            trees++;
          }
        }
      }

      if (trees >= 4) {
        toChange.push([y, x]);
      }
    }
  }

  for (const [y, x] of toChange) {
    grid[y][x] = "@";
  }
}

// 6. Count trees

let result = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === "@") {
      result++;
    }
  }
}

console.log(result);
