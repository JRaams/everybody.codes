const input = await Bun.file("1.txt").text();

type Cell = {
  y: number;
  x: number;
};

function parse(i: string) {
  const startRaw = i.match(/START=\[(\d+),(\d+)\]/);
  const startX = Number(startRaw?.[1]);
  const startY = Number(startRaw?.[2]);
  const start: Cell = { y: startY, x: startX };

  const beacons = new Map<string, Cell>();

  const aRaw = i.match(/A=\[(\d+),(\d+)\]/);
  const aX = Number(aRaw?.[1]);
  const aY = Number(aRaw?.[2]);
  beacons.set("A", { y: aY, x: aX });

  const bRaw = i.match(/B=\[(\d+),(\d+)\]/);
  const bX = Number(bRaw?.[1]);
  const bY = Number(bRaw?.[2]);
  beacons.set("B", { y: bY, x: bX });

  const cRaw = i.match(/C=\[(\d+),(\d+)\]/);
  const cX = Number(cRaw?.[1]);
  const cY = Number(cRaw?.[2]);
  beacons.set("C", { y: cY, x: cX });

  const movesRaw = i.match(/MOVES=(\w+)/)!;
  const moves = movesRaw[1].split("");

  return { start, beacons, moves };
}

const { start, beacons, moves } = parse(input);

const seen = new Set<string>();
seen.add(start.x + "_" + start.y);

let { y, x } = start;

for (const move of moves) {
  const { y: by, x: bx } = beacons.get(move)!;

  y = Math.floor(Math.abs(y + by) / 2);
  x = Math.floor(Math.abs(x + bx) / 2);

  seen.add(x + "_" + y);
}

console.log(seen.size);
