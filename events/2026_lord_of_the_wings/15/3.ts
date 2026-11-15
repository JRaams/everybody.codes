import { parseInput, type ParsedInput } from "./cavern";

const TARGET = 202620262026;

type State = {
  y: number;
  x: number;
  direction: number | null;
  sulphur: number;
  distance: number;
};

function stateKey(cell: number, dir: number | null, sulphur: number) {
  return `${cell}|${dir}|${sulphur}`;
}

function buildMinSteps(parsedInput: ParsedInput): Int32Array {
  const { grid, start, end, deposits } = parsedInput;
  const cols = grid[0].length;

  // Minimum amount of steps to reach the end with N sulfur
  const minSteps = new Int32Array(3 * deposits.length + 1).fill(-1);
  const visited = new Set<string>();
  const queue: State[] = [
    { y: start.y, x: start.x, direction: null, sulphur: 0, distance: 0 },
  ];

  visited.add(stateKey(start.id, null, 0));

  while (queue.length > 0) {
    const { y, x, sulphur, direction, distance } = queue.shift()!;

    if (y === end.y && x === end.x && minSteps[sulphur] === -1) {
      minSteps[sulphur] = distance;
    }

    for (let nextDirection = 0; nextDirection < 4; nextDirection++) {
      if (direction !== null && Math.abs(nextDirection - direction) === 2) {
        continue;
      }

      const [dy, dx] = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
      ][nextDirection];
      const ny = y + dy;
      const nx = x + dx;
      const nc = grid[ny]?.[nx];

      if (nc === undefined || nc === "#") continue;

      const nextSulphur = sulphur + (nc === "@" ? 1 : 0);
      if (nextSulphur > 3 * deposits.length) continue;

      const nextCell = ny * cols + nx;
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

  return minSteps;
}

function findPeriod(minSteps: Int32Array, depositCount: number) {
  const first = depositCount;
  const last = minSteps.length - 1;

  for (let period = 1; period < depositCount; period++) {
    if (minSteps[first] < 0 || minSteps[first + period] < 0) continue;

    const dt = minSteps[first + period] - minSteps[first];
    if (dt <= 0) continue;

    let matches = true;
    for (let k = first; k + period <= last; k++) {
      if (
        minSteps[k] < 0 ||
        minSteps[k + period] < 0 ||
        minSteps[k + period] - minSteps[k] !== dt
      ) {
        matches = false;
        break;
      }
    }

    if (matches) return { period, dt };
  }

  throw new Error("No period found; increase the sampled sulphur range.");
}

function shortestRoute(input: string): number {
  const parsedInput = parseInput(input);

  const numDeposits = parsedInput.deposits.length;

  const minSteps = buildMinSteps(parsedInput);
  const { period, dt } = findPeriod(minSteps, numDeposits);

  const pivot =
    (TARGET % period) + (Math.floor(numDeposits / period) + 1) * period;

  const answer = minSteps[pivot] + ((TARGET - pivot) / period) * dt;

  return answer;
}

const input = await Bun.file("3.txt").text();

console.log(shortestRoute(input));
