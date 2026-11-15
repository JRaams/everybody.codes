export function parseInput(input: string): ParsedInput {
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.trim());

  const rows = grid.length;
  const cols = grid[0].length;

  let id = 0;
  let start: Point | undefined;
  let end: Point | undefined;
  const deposits: Point[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      switch (grid[y][x]) {
        case "S":
          start = { id, y, x };
          break;
        case "E":
          end = { id, y, x };
          break;
        case "@":
          deposits.push({ id, y, x });
          break;
      }

      id++;
    }
  }

  if (!start || !end) {
    throw new Error("Grid must contain both S and E.");
  }

  return { grid, start, end, deposits };
}

type Point = {
  id: number;
  y: number;
  x: number;
};

export type ParsedInput = {
  grid: string[];
  start: Point;
  end: Point;
  deposits: Point[];
};
