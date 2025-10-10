export function rotate<T>(grid: T[][], operations: string[]) {
  let operationIndex = 0;

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      const operation = operations[operationIndex];
      operationIndex = (operationIndex + 1) % operations.length;

      if (operation === "L") {
        const temp = grid[y - 1][x - 1];
        grid[y - 1][x - 1] = grid[y - 1][x + 0];
        grid[y - 1][x + 0] = grid[y - 1][x + 1];
        grid[y - 1][x + 1] = grid[y + 0][x + 1];
        grid[y + 0][x + 1] = grid[y + 1][x + 1];
        grid[y + 1][x + 1] = grid[y + 1][x + 0];
        grid[y + 1][x + 0] = grid[y + 1][x - 1];
        grid[y + 1][x - 1] = grid[y + 0][x - 1];
        grid[y + 0][x - 1] = temp;
      } else if (operation === "R") {
        const temp = grid[y - 1][x - 1];
        grid[y - 1][x - 1] = grid[y - 0][x - 1];
        grid[y - 0][x - 1] = grid[y + 1][x - 1];
        grid[y + 1][x - 1] = grid[y + 1][x + 0];
        grid[y + 1][x + 0] = grid[y + 1][x + 1];
        grid[y + 1][x + 1] = grid[y + 0][x + 1];
        grid[y + 0][x + 1] = grid[y - 1][x + 1];
        grid[y - 1][x + 1] = grid[y - 1][x + 0];
        grid[y - 1][x + 0] = temp;
      }
    }
  }
}

export function findMessage(grid: string[][]) {
  const line = grid.flat().join("");

  const start = line.indexOf(">");
  const end = line.indexOf("<");

  return line.slice(start + 1, end);
}

export type Cell = [y: number, x: number];

export function swapCells<T>(grid: T[][], nextCells: Cell[][]): T[][] {
  const clone = structuredClone(grid);

  for (let y = 0; y < clone.length; y++) {
    for (let x = 0; x < clone[y].length; x++) {
      const [newY, newX] = nextCells[y][x];
      clone[y][x] = grid[newY][newX];
    }
  }

  return clone;
}
