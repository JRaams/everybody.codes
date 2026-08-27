import { parse, key } from "./sparkball";

const { start, beacons, moves } = await parse("1.txt");

let [x, y] = start;

const beetles = new Set<string>();
beetles.add(key(x, y));

for (const move of moves) {
  const [bx, by] = beacons.get(move)!;

  x = Math.floor(Math.abs(x + bx) / 2);
  y = Math.floor(Math.abs(y + by) / 2);

  beetles.add(key(x, y));
}

console.log(beetles.size);
