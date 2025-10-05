const txt = await Bun.file("2.txt").text();

const DELTAS = {
  U: [0, 1, 0],
  D: [0, -1, 0],
  R: [1, 0, 0],
  L: [-1, 0, 0],
  F: [0, 0, 1],
  B: [0, 0, -1],
};

const visited = new Set<string>();

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
});

console.log(visited.size);
