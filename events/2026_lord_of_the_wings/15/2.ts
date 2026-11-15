import { parseInput } from "./cavern";

const TARGET = 2026;

type State = {
  y: number;
  x: number;
  direction: number | null;
  sulphur: number;
  distance: number;
};

function stateKey(cell: number, dir: number | null, sulphur: number): string {
  return `${cell}|${dir}|${sulphur}`;
}

function shortestRoute(input: string): number {
  const { grid, start, end } = parseInput(input);
  const cols = grid[0].length;

  const visited = new Set<string>([stateKey(start.id, 4, 0)]);
  const queue: State[] = [
    { y: start.y, x: start.x, direction: null, sulphur: 0, distance: 0 },
  ];

  while (queue.length > 0) {
    const { y, x, sulphur, direction, distance } = queue.shift()!;

    if (y === end.y && x === end.x && sulphur === TARGET) {
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
      const nextSulphur = Math.min(
        TARGET,
        sulphur + (grid[ny][nx] === "@" ? 1 : 0),
      );

      const key = stateKey(nextCell, nextDirection, nextSulphur);
      if (visited.has(key)) continue;

      visited.add(key);
      queue.push({
        y: ny,
        x: nx,
        direction: nextDirection,
        sulphur: nextSulphur,
        distance: distance + 1,
      });
    }
  }

  return -1;
}

const input = await Bun.file("2.txt").text();

console.log(shortestRoute(input));
