export async function parse(fileName: string) {
  const input = await Bun.file(fileName).text();

  const grid = input.split("\n").map((line) => line.split(""));

  const sheeps = new Set<string>();
  let dragon = "";

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "D") {
        dragon = `${y},${x}`;
      } else if (grid[y][x] === "S") {
        sheeps.add(`${y},${x}`);
      }
    }
  }

  return { grid, dragon, sheeps };
}

export function nextMoves(grid: string[][], dragon: string) {
  const [y, x] = dragon.split(",").map(Number);

  return [
    [y - 2, x - 1],
    [y - 2, x + 1],
    [y + 2, x - 1],
    [y + 2, x + 1],
    [y - 1, x - 2],
    [y + 1, x - 2],
    [y - 1, x + 2],
    [y + 1, x + 2],
  ]
    .filter(([ny, nx]) => grid[ny]?.[nx] !== undefined)
    .map(([ny, nx]) => `${ny},${nx}`);
}
