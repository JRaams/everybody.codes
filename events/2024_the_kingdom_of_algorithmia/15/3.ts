const txt = await Bun.file("3.txt").text();

const grid = txt.split("\n").map((line) => line.split(""));

const STARTX = grid[0].findIndex((char) => char === ".");

function mask(char: string) {
  if (!char.match(/[A-Z]/)) return 0;
  return 1 << (char.charCodeAt(0) - "A".charCodeAt(0));
}

function countOnes(n: number) {
  let i = 0;
  while (n > 0) {
    if (n & 1) i++;
    n >>= 1;
  }
  return i;
}

let allHerbsMask = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x].match(/[A-Z]/)) {
      allHerbsMask |= mask(grid[y][x]);
    }
  }
}

type State = {
  x: number;
  y: number;
  herbs: number;
  steps: number;
};

const queue: State[] = [
  {
    x: STARTX,
    y: 0,
    herbs: 0,
    steps: 0,
  },
];

const visited = new Set<string>();
let mostHerbs = 0;

while (queue.length > 0) {
  const { x, y, herbs, steps } = queue.shift()!;

  if (x === STARTX && y === 0) {
    if (herbs === allHerbsMask) {
      console.log(steps);
      break;
    }
  }

  // Trick by WilkoTom: aggressive branch pruning
  if (countOnes(herbs) + 3 < mostHerbs) continue;
  mostHerbs = Math.max(mostHerbs, countOnes(herbs));

  for (const [dx, dy] of [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]) {
    const nx = x + dx;
    const ny = y + dy;

    const symbol = grid[ny]?.[nx];
    if (symbol === undefined || symbol === "#" || symbol === "~") continue;

    const key = `${nx},${ny},${herbs}`;

    if (visited.has(key)) continue;
    visited.add(key);

    queue.push({
      x: nx,
      y: ny,
      herbs: herbs | mask(symbol),
      steps: steps + 1,
    });
  }
}
