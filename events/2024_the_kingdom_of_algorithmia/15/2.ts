const txt = await Bun.file("2.txt").text();

const grid = txt.split("\n").map((line) => line.split(""));

let STARTY = 0;
let STARTX = grid[0].findIndex((char) => char === ".");

type State = {
  x: number;
  y: number;
  hasA: boolean;
  hasB: boolean;
  hasC: boolean;
  hasD: boolean;
  hasE: boolean;
  distance: number;
};

function hash(state: State): string {
  return `${state.x},${state.y},${state.hasA},${state.hasB},${state.hasC},${state.hasD},${state.hasE}`;
}

const queue: State[] = [
  {
    x: STARTX,
    y: STARTY,
    hasA: false,
    hasB: false,
    hasC: false,
    hasD: false,
    hasE: false,
    distance: 0,
  },
];
const seen = new Map<string, number>();

while (queue.length > 0) {
  let { x, y, hasA, hasB, hasC, hasD, hasE, distance } = queue.shift()!;

  const key = hash({ x, y, hasA, hasB, hasC, hasD, hasE, distance });

  if (seen.has(key)) {
    if (seen.get(key)! <= distance) continue;
  }
  seen.set(key, distance);

  if (grid[y][x] === "A") {
    hasA = true;
  } else if (grid[y][x] === "B") {
    hasB = true;
  } else if (grid[y][x] === "C") {
    hasC = true;
  } else if (grid[y][x] === "D") {
    hasD = true;
  } else if (grid[y][x] === "E") {
    hasE = true;
  } else if (x === STARTX && y === STARTY) {
    if (hasA && hasB && hasC && hasD && hasE) {
      console.log(distance);
      break;
    }
  }

  for (const [dx, dy] of [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]) {
    const nx = x + dx;
    const ny = y + dy;

    if (grid[ny]?.[nx] === undefined) continue;
    if (grid[ny][nx] === "#") continue;
    if (grid[ny][nx] === "~") continue;

    queue.push({
      x: nx,
      y: ny,
      hasA,
      hasB,
      hasC,
      hasD,
      hasE,
      distance: distance + 1,
    });
  }
}
