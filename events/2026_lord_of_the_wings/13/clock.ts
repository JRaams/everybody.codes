export function parse(input: string): Input {
  const lines = input.trim().split("\n");
  const values = lines.map((x) => x.trim().split(" ")[1]);

  const hands = values[0].split(":").map(Number);
  const directions = values[1].split(":") as Direction[];
  const currents = values[2].split(":").map(Number);
  const moves = values[3].split(":").map(Number);
  
  return { hands, directions, currents, moves };
}

export function calibrationValue(input: Input): number {
  const { hands, directions, currents, moves } = input;

  const { scale, positions, speed } = normalize(hands, directions, currents);

  let total = 0;

  for (const [a, b] of HAND_PAIRS) {
    const [i, j] = moves[a] <= moves[b] ? [a, b] : [b, a];

    const start = positions[j] - positions[i];
    const mid = start + (speed[j] - speed[i]) * moves[i];
    const end = mid + speed[j] * (moves[j] - moves[i]);

    total += crossings(start, mid, scale);
    total += crossings(mid, end, scale);
  }

  return total;
}

function normalize(
  hands: number[],
  directions: Direction[],
  currents: number[],
): Normalized {
  const scale = hands.reduce((result, spaces) => lcm(result, spaces), 1);

  const positions = hands.map((spaces, i) => (scale / spaces) * currents[i]);

  const speed = hands.map(
    (spaces, i) => (directions[i] === "CW" ? 1 : -1) * (scale / spaces),
  );

  return {
    scale,
    positions,
    speed,
  };
}

function crossings(start: number, end: number, scale: number): number {
  return end > start
    ? Math.floor(end / scale) - Math.floor(start / scale)
    : Math.floor(-end / scale) - Math.floor(-start / scale);
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

type Direction = "CW" | "CCW";

type Input = {
  hands: number[];
  directions: Direction[];
  currents: number[];
  moves: number[];
};

type Normalized = {
  scale: number;
  positions: number[];
  speed: number[];
};

const HAND_PAIRS = [
  [0, 1],
  [0, 2],
  [1, 2],
] as const;
