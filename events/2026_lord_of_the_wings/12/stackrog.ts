function buildGraph(grid: string[]) {
  const rows = grid.length;
  const cols = grid[0].length;

  const horizontalId = Array.from({ length: rows }, () =>
    Array<number>(cols).fill(-1),
  );
  let horizontalCount = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] !== "#") continue;

      const id = horizontalCount++;

      while (x < cols && grid[y][x] === "#") {
        horizontalId[y][x] = id;
        x++;
      }
    }
  }

  const verticalId = Array.from({ length: rows }, () =>
    Array<number>(cols).fill(-1),
  );
  let verticalCount = 0;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[y][x] !== "#") continue;

      const id = verticalCount++;

      while (y < rows && grid[y][x] === "#") {
        verticalId[y][x] = id;
        y++;
      }
    }
  }

  const graph: number[][] = Array.from({ length: horizontalCount }, () => []);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === "#") {
        graph[horizontalId[y][x]].push(verticalId[y][x]);
      }
    }
  }

  return { graph, horizontalCount, verticalCount };
}

function tryKuhn(
  horizontal: number,
  graph: number[][],
  matchedVertical: number[],
  seen: boolean[],
): boolean {
  for (const vertical of graph[horizontal]) {
    if (seen[vertical]) continue;
    seen[vertical] = true;

    if (
      matchedVertical[vertical] === -1 ||
      tryKuhn(matchedVertical[vertical], graph, matchedVertical, seen)
    ) {
      matchedVertical[vertical] = horizontal;
      return true;
    }
  }

  return false;
}

export function minimumSpells(input: string): number {
  const grid = input
    .trim()
    .split("\n")
    .map((x) => x.trim());

  if (grid.length === 0) return 0;

  const { graph, horizontalCount, verticalCount } = buildGraph(grid);

  const matchedVertical = Array<number>(verticalCount).fill(-1);

  let matchingSize = 0;

  for (let horizontal = 0; horizontal < horizontalCount; horizontal++) {
    const seen = Array<boolean>(verticalCount).fill(false);

    if (tryKuhn(horizontal, graph, matchedVertical, seen)) {
      matchingSize++;
    }
  }

  return matchingSize;
}
