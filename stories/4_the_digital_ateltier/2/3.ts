import { parse, key, findFireflies } from "./sparkball";

const { start, beacons } = await parse("3.txt");

const beetles = new Set<string>();

const queue: [number, number][] = [start];

while (queue.length > 0) {
  const [x, y] = queue.shift()!;
  beetles.add(key(x, y));

  ["A", "B", "C"].forEach((m) => {
    const [bx, by] = beacons.get(m)!;
    const newX = Math.floor(Math.abs(x + bx) / 2);
    const newY = Math.floor(Math.abs(y + by) / 2);

    if (!beetles.has(key(newX, newY))) {
      queue.push([newX, newY]);
    }
  });
}

const numFireflies = findFireflies(beetles);

console.log(numFireflies);
