const text = await Bun.file("2.txt").text();
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

const queue: [y: number, x: number, jumps: number][] = [[start.y, start.x, 0]];

const seen = new Set<string>();

while (queue.length > 0) {
  const [y, x, jumps] = queue.shift()!;

  if (input[y]?.[x] !== "T") continue;

  const key = `${y},${x}`;
  if (seen.has(key)) continue;
  seen.add(key);

  if (y === end.y && x === end.x) {
    console.log(jumps);
    break;
  }

  // Horizontal moves
  queue.push([y, x - 1, jumps + 1]);
  queue.push([y, x + 1, jumps + 1]);

  // Vertical moves
  const dy = (y + x) % 2 === 0 ? -1 : 1;
  queue.push([y + dy, x, jumps + 1]);
}
