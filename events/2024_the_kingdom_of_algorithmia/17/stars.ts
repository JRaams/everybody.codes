import { MinHeap } from "@datastructures-js/heap";

export function parse(txt: string): Star[] {
  const stars: Star[] = [];

  const lines = txt.split("\n");
  let i = 0;

  for (let y = 0; y < lines.length; y++) {
    const chars = lines[y].split("");
    for (let x = 0; x < chars.length; x++) {
      const char = chars[x];
      if (char === "*") {
        stars.push({ id: i++, x, y });
      }
    }
  }

  return stars;
}

export function calculateConstellationSize(stars: Star[]): number {
  let result = stars.length;

  const minDistances = new MinHeap<[number, Star]>((a) => a[0]);
  minDistances.insert([0, stars[0]]);

  const queue = stars.slice();

  while (queue.length > 0) {
    const [distance, star] = minDistances.pop()!;

    if (!queue.find((x) => x.id === star.id)) continue;
    queue.splice(queue.indexOf(star), 1);

    result += distance;

    for (const next of queue) {
      minDistances.insert([manhattan(star, next), next]);
    }
  }

  return result;
}

export function manhattan(a: Star, b: Star): number {
  if (a.id === b.id) return Infinity;
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx + dy;
}

export type Star = {
  id: number;
  x: number;
  y: number;
};
