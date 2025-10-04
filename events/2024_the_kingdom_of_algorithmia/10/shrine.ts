export function readRunicWord(grid: string[][]): string {
  // 1. Get all empty positions
  const positionsToFill: [y: number, x: number][] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === ".") {
        positionsToFill.push([y, x]);
      }
    }
  }

  // 2. Find symbols for empty positions
  const queue = positionsToFill.slice();

  while (queue.length > 0) {
    const [y, x] = queue.shift()!;

    const availableInColumn = new Set<string>();
    const availableInRow = new Set<string>();

    for (let i = 0; i < grid.length; i++) {
      if (grid[i][x] !== ".") {
        availableInColumn.add(grid[i][x]);
      }
    }
    for (let i = 0; i < grid[y].length; i++) {
      if (grid[y][i] !== ".") {
        availableInRow.add(grid[y][i]);
      }
    }

    const intersection = availableInColumn.intersection(availableInRow);

    if (intersection.size === 1) {
      const symbol = intersection.values().next().value!;
      grid[y][x] = symbol;
      continue;
    }

    queue.push([y, x]);
  }

  // 3. Find runic word
  let result = "";

  positionsToFill.forEach(([y, x]) => {
    result += grid[y][x];
  });

  return result;
}

export function calculateRunicPower(rune: string): number {
  let power = 0;

  for (let i = 0; i < rune.length; i++) {
    const symbol = rune[i];
    const base = symbol.charCodeAt(0) - 64;
    const position = i + 1;

    power += base * position;
  }

  return power;
}
