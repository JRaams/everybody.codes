const text = await Bun.file("3.txt").text();
const input = text.split("\n").map((line) => line.split(""));

type Cell = { y: number; x: number };

let start: Cell = { y: 0, x: 0 };
let end: Cell = { y: 0, x: 0 };

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === "S") {
      start = { y, x };
      input[y][x] = "T";
    } else if (input[y][x] === "E") {
      end = { y, x };
      input[y][x] = "T";
    }
  }
}

function rotateMap(map: string[][]) {
  const newMap = structuredClone(map);

  for (let y = 0; y < map.length; y++) {
    for (let x = y; x < map[0].length - y; x++) {
      const newX = map[0].length - 1 - Math.floor((x - y + 1) / 2) - y * 2;
      const newY = Math.floor((x - y) / 2);
      newMap[newY][newX] = map[y][x];
    }
  }

  return newMap;
}

const maps = [input];
maps.push(rotateMap(maps[0]));
maps.push(rotateMap(maps[1]));

const queue: [y: number, x: number, jumps: number, mapIndex: number][] = [
  [start.y, start.x, 0, 0],
];

const seen = new Set<string>();

while (queue.length > 0) {
  const [y, x, jumps, mapIndex] = queue.shift()!;

  if (maps[mapIndex][y]?.[x] !== "T") continue;

  const key = `${y},${x},${mapIndex}`;
  if (seen.has(key)) continue;
  seen.add(key);

  if (y === end.y && x === end.x) {
    console.log(jumps);
    break;
  }

  const nextMapIndex = (mapIndex + 1) % maps.length;

  // Jump in place
  queue.push([y, x, jumps + 1, nextMapIndex]);

  // Horizontal moves
  queue.push([y, x - 1, jumps + 1, nextMapIndex]);
  queue.push([y, x + 1, jumps + 1, nextMapIndex]);

  // Vertical moves
  const dy = (y + x) % 2 === 0 ? -1 : 1;
  queue.push([y + dy, x, jumps + 1, nextMapIndex]);
}
