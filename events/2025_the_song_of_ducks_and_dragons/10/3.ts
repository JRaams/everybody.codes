import { nextMoves, parse } from "./board";

const { grid, dragon, sheeps } = await parse("3.txt");

// For each column -> mark hideouts that go all the way to the bottom
// If a sheep lands here, it can never be eaten anymore
for (let x = 0; x < grid[0].length; x++) {
  let y = grid.length - 1;
  while (grid[y][x] === "#") {
    grid[y][x] = "B";
    y--;
  }
}

const cache = new Map<string, number>();

function numWaysAllSheepEaten(
  grid: string[][],
  dragon: string,
  sheeps: string[],
  isSheepTurn: boolean
): number {
  const key = `${dragon}_${sheeps.join(",")}_${isSheepTurn}`;
  if (cache.has(key)) return cache.get(key)!;

  const result = isSheepTurn
    ? moveSheep(grid, dragon, sheeps)
    : moveDragon(grid, dragon, sheeps);

  cache.set(key, result);

  return result;
}

function moveSheep(grid: string[][], dragon: string, sheeps: string[]): number {
  if (sheeps.length === 0) return 1;
  let total = 0;
  let hasMoved = false;

  for (let i = 0; i < sheeps.length; i++) {
    const s = sheeps[i];
    const [y, x] = s.split(",").map(Number);

    if (grid[y][x] === "B") {
      return 0;
    } else if (y === grid.length - 1) {
      hasMoved = true;
    } else if (grid[y + 1][x] === "#" || dragon !== `${y + 1},${x}`) {
      hasMoved = true;

      sheeps[i] = `${y + 1},${x}`;
      total += numWaysAllSheepEaten(grid, dragon, sheeps, false);
      sheeps[i] = s;
    }
  }

  if (!hasMoved) {
    total += numWaysAllSheepEaten(grid, dragon, sheeps, false);
  }

  return total;
}

function moveDragon(
  grid: string[][],
  dragon: string,
  sheeps: string[]
): number {
  let total = 0;

  nextMoves(grid, dragon).forEach((nextDragon) => {
    const [y, x] = nextDragon.split(",").map(Number);

    const newSheeps = sheeps.filter(
      (s) => s !== nextDragon || grid[y][x] === "#" || grid[y][x] === "B"
    );

    total += numWaysAllSheepEaten(grid, nextDragon, newSheeps, true);
  });

  return total;
}

console.log(numWaysAllSheepEaten(grid, dragon, Array.from(sheeps), true));
