export function findExplodedBarrels(
  grid: number[][],
  y: number,
  x: number,
  alreadySeen: Set<string>
): Set<string> {
  const seen = new Set<string>(alreadySeen);
  const queue = [[y, x]];

  while (queue.length > 0) {
    const [y, x] = queue.shift()!;

    if (seen.has(`${y},${x}`)) continue;
    seen.add(`${y},${x}`);

    for (const [dy, dx] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const [ny, nx] = [y + dy, x + dx];

      if (grid[ny]?.[nx] === undefined) continue;

      if (grid[ny][nx] <= grid[y][x]) {
        queue.push([ny, nx]);
      }
    }
  }

  return seen;
}

export async function convertGridToPPM(
  grid: number[][],
  exploded: Set<string>,
  part: number
) {
  const ppmHeader = `P3\n${grid[0].length} ${grid.length}\n9\n`;

  let ppmOriginal = ppmHeader;
  let ppmExploded = ppmHeader;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      ppmOriginal += `${grid[y][x]} `.repeat(3);

      ppmExploded += exploded.has(`${y},${x}`) ? "9 9 9 " : "0 0 0 ";
    }
    ppmOriginal += "\n";
    ppmExploded += "\n";
  }

  await Bun.write(__dirname + `/assets/${part}-original.ppm`, ppmOriginal);
  await Bun.write(__dirname + `/assets/${part}-exploded.ppm`, ppmExploded);
}
