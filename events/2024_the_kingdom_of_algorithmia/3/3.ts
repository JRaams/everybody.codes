const lines = await Bun.file("3.txt").text();
const input = lines.split("\n").map((x) => x.split(""));

let grid = structuredClone(input);
let level = 0;
let result = 0;

while (true) {
  let changed = false;

  const nextGrid = structuredClone(grid);

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (grid[y][x] === ".") {
        continue;
      }

      if (grid[y][x] === "#") {
        changed = true;
        result++;
        nextGrid[y][x] = "1";
        continue;
      }

      let neighbours = 0;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dy === 0 && dx === 0) {
            continue;
          }

          let [ny, nx] = [y + dy, x + dx];
          if (grid[ny]?.[nx] === level.toString()) {
            neighbours++;
          }
        }
      }

      if (neighbours === 8) {
        changed = true;
        result++;
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

console.log(result);
