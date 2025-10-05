import { defaultDict } from "../../../util/defaultdict";

const txt = await Bun.file("3.txt").text();

const DELTAS = {
  U: [0, 1, 0],
  D: [0, -1, 0],
  R: [1, 0, 0],
  L: [-1, 0, 0],
  F: [0, 0, 1],
  B: [0, 0, -1],
};

const visited = new Set<string>();
const leaves: [number, number, number][] = [];

txt.split("\n").forEach((line) => {
  const moves = line.split(",");

  let [x, y, z] = [0, 0, 0];

  moves.forEach((move) => {
    const dir = move[0];
    const steps = parseInt(move.slice(1));

    const [dx, dy, dz] = DELTAS[dir as keyof typeof DELTAS];

    for (let i = 0; i < steps; i++) {
      x += dx;
      y += dy;
      z += dz;

      visited.add(`${x},${y},${z}`);
    }
  });

  leaves.push([x, y, z]);
});

let murkiness = defaultDict(() => 0);

for (const leaf of leaves) {
  const queue = [[leaf[0], leaf[1], leaf[2], 0]];
  const seen = new Set<string>();

  while (queue.length > 0) {
    const [x, y, z, distance] = queue.shift()!;

    if (x === 0 && z === 0) {
      murkiness[`${x},${y},${z}`] += distance;
    }

    Object.values(DELTAS).forEach(([dx, dy, dz]) => {
      const nx = x + dx;
      const ny = y + dy;
      const nz = z + dz;

      const key = `${nx},${ny},${nz}`;

      if (!visited.has(key)) return;

      if (seen.has(key)) return;
      seen.add(key);

      queue.push([nx, ny, nz, distance + 1]);
    });
  }
}

let result = Infinity;

Object.values(murkiness).forEach((value) => {
  result = Math.min(result, value);
});

console.log(result);
