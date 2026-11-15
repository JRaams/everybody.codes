import { parseInput } from "./cavern";

type State = {
  y: number;
  x: number;
  direction: number | null;
  collected: Set<number>;
  distance: number;
};

function stateKey(
  cell: number,
  dir: number | null,
  collected: Set<number>,
): string {
  return `${cell}|${dir}|${[...collected].sort((a, b) => a - b).join(",")}`;
}

function shortestRoute(input: string): number {
  const { grid, start, end, deposits } = parseInput(input);
  const cols = grid[0].length;

  const visited = new Set<string>([stateKey(start.id, null, new Set())]);

  const queue: State[] = [
    {
      y: start.y,
      x: start.x,
      direction: null,
      collected: new Set(),
      distance: 0,
    },
  ];

  while (queue.length > 0) {
    const { y, x, collected, direction, distance } = queue.shift()!;

    if (y === end.y && x === end.x && collected.size === deposits.length) {
      return distance;
    }

    for (let nextDirection = 0; nextDirection < 4; nextDirection++) {
      if (direction !== null && Math.abs(nextDirection - direction) === 2) {
        continue;
      }

      const [DY, DX] = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
      ][nextDirection];

      const ny = y + DY;
      const nx = x + DX;
      const nc = grid[ny]?.[nx];

      if (nc === undefined || nc === "#") {
        continue;
      }

      const nextCell = ny * cols + nx;
      let nextCollected = collected;

      if (nc === "@" && !collected.has(nextCell)) {
        nextCollected = new Set(collected);
        nextCollected.add(nextCell);
      }

      const key = stateKey(nextCell, nextDirection, nextCollected);
      if (visited.has(key)) continue;

      visited.add(key);
      queue.push({
        y: ny,
        x: nx,
        direction: nextDirection,
        collected: nextCollected,
        distance: distance + 1,
      });
    }
  }

  return -1;
}

const input = await Bun.file("1.txt").text();

console.log(shortestRoute(input));
