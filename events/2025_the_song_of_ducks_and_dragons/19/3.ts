const text = await Bun.file("3.txt").text();

const input = text.split("\n").map((x) => x.split(",").map(Number));

type Opening = { x: number; yRanges: [min: number, max: number][] };

const openings: Opening[] = [];

for (const [x, y, length] of input) {
  const existingOpening = openings.find((opening) => opening.x === x);

  if (existingOpening) {
    existingOpening.yRanges.push([y, y + length - 1]);
  } else {
    openings.push({ x, yRanges: [[y, y + length - 1]] });
  }
}

const queue: [y: number, x: number, wall: number, flaps: number][] = [
  [0, 0, 0, 0],
];

const seen = new Map<string, number>();

let min = Infinity;
let maxWall = 0;

while (queue.length > 0) {
  const [y, x, wall, flaps] = queue.shift()!;

  if (wall > maxWall) {
    console.log("maxWall", y, x, wall, flaps, queue.length);
    maxWall = wall;
  }

  const key = `${y},${x}`;
  if (seen.has(key) && seen.get(key)! <= flaps) continue;
  seen.set(key, flaps);

  if (wall === openings.length) {
    if (min > flaps) {
      min = flaps;
    }
    continue;
  }

  const opening = openings[wall];
  const dist = opening.x - x;

  for (let dy = y - dist; dy <= y + dist; dy++) {
    if (dy < 0) continue;
    if (opening.yRanges.some(([min, max]) => dy >= min && dy <= max)) {
      const rise = y - dy;
      const newFlaps = Math.ceil((dist - rise) / 2);
      queue.push([dy, x + dist, wall + 1, flaps + newFlaps]);
    }
  }
}

console.log(min);
