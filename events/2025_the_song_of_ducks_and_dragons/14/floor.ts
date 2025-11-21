export async function parse(fileName: string): Promise<string[][]> {
  const lines = await Bun.file(fileName).text();
  return lines.split("\n").map((line) => line.split(""));
}

export function simulate(input: string[][]): string[][] {
  const result: string[][] = [];

  for (let y = 0; y < input.length; y++) {
    result.push([]);

    for (let x = 0; x < input[y].length; x++) {
      let amountActive = 0;

      for (const [ny, nx] of [
        [y - 1, x - 1],
        [y - 1, x + 1],
        [y + 1, x + 1],
        [y + 1, x - 1],
      ]) {
        if (input[ny]?.[nx] === "#") {
          amountActive++;
        }
      }

      if (input[y][x] === "#") {
        result[y][x] = amountActive % 2 === 1 ? "#" : ".";
      } else {
        result[y][x] = amountActive % 2 === 0 ? "#" : ".";
      }
    }
  }

  return result;
}

export function countActive(grid: string[][]): number {
  let active = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        active++;
      }
    }
  }

  return active;
}
