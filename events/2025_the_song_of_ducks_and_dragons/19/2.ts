const text = await Bun.file("3.txt").text();
const input = text.split("\n").map((x) => x.split(",").map(Number));

let maxX = 0;
let maxY = 0;

input.forEach((line) => {
  const [x, y, length] = line;
  maxX = Math.max(maxX, x);
  maxY = Math.max(maxY, y + length);
});

const grid = Array.from({ length: maxY }, () =>
  Array.from({ length: maxX }, () => ".")
);

input.forEach((line) => {
  for (let y = 0; y < maxY; y++) {
    grid[y][line[0]] = "#";
  }
});

input.forEach((line) => {
  const [x, yStart, length] = line;

  for (let y = yStart; y < yStart + length; y++) {
    grid[y][x] = ".";
  }
});

const queue: [y: number, x: number, flaps: number][] = [[0, 0, 0]];

const seen = new Map<number, number>();

let min = Infinity;

while (queue.length > 0) {
  const [y, x, flaps] = queue.shift()!;

  if (seen.has(x) && seen.get(x)! <= flaps) continue;
  seen.set(x, flaps);

  if (y < 0 || y >= maxY) continue;

  if (grid[y][x] === "#") continue;

  if (x === maxX) {
    if (min > flaps) {
      min = flaps;
    }
    continue;
  }

  queue.push([y + 1, x + 1, flaps + 1]);
  queue.push([y - 1, x + 1, flaps]);
}

console.log(min);
