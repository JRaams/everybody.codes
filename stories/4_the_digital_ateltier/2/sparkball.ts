export async function parse(file: string) {
  const input = await Bun.file(file).text();

  const [startX, startY, aX, aY, bX, bY, cX, cY] = input
    .matchAll(/\d+/g)!
    .map(Number);

  const start: [number, number] = [startX, startY];

  const beacons = new Map<string, [number, number]>();
  beacons.set("A", [aX, aY]);
  beacons.set("B", [bX, bY]);
  beacons.set("C", [cX, cY]);

  const movesRaw = input.match(/MOVES=(\w+)/);
  const moves = movesRaw ? movesRaw[1].split("") : [];

  return { start, beacons, moves };
}

export function key(x: number, y: number): string {
  return x + "_" + y;
}

export function findFireflies(beetles: Set<string>): number {
  const fireflies = new Set<string>();

  function addFireflies(x: number, y: number): void {
    [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ].forEach(([dx, dy]) => {
      const k = key(x + dx, y + dy);

      if (!beetles.has(k)) {
        fireflies.add(k);
      }
    });
  }

  beetles.forEach((beetle) => {
    const [x, y] = beetle.split("_").map(Number);

    addFireflies(x, y);
  });

  return fireflies.size;
}
