const lines = await Bun.file("1.txt").text();
const input = lines.split("\n").map((x) => x.replaceAll("#", "1").split(""));

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let grid = structuredClone(input);
let level = 1;

while (true) {
  let changed = false;

  const nextGrid = structuredClone(grid);

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      let neighbours = 0;

      for (const [dy, dx] of DIRECTIONS) {
        let [ny, nx] = [y + dy, x + dx];
        if (grid[ny]?.[nx] === level.toString()) {
          neighbours++;
        }
      }

      if (neighbours === 4) {
        changed = true;
        nextGrid[y][x] = (level + 1).toString();
      }
    }
  }

  if (!changed) {
    break;
  }

  grid = nextGrid;
  level++;
}

let result = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = Number(grid[y][x]);
    if (Number.isNaN(c)) {
      continue;
    }

    result += c;
  }
}

console.log(result);
