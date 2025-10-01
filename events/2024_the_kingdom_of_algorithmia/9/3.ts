const txt = await Bun.file("3.txt").text();
const input = txt.trim().split("\n").map(Number);

const DOTS = [
  1, 3, 5, 10, 15, 16, 20, 24, 25, 30, 37, 38, 49, 50, 74, 75, 100, 101,
].reverse();

const cache = new Map<number, number>();

function minBeetlesToMake(brightness: number): number {
  if (cache.has(brightness)) {
    return cache.get(brightness)!;
  }

  if (brightness == 0) return 0;

  if (brightness < 0) return Infinity;

  let best = Infinity;

  DOTS.forEach((dot) => {
    const newTotal = 1 + minBeetlesToMake(brightness - dot);
    best = Math.min(best, newTotal);
  });

  cache.set(brightness, best);
  return best;
}

let totalBeetles = 0;

input.forEach((targetBrightness) => {
  let best = Infinity;

  const middle = Math.floor(targetBrightness / 2);

  for (let a = middle; a < middle + 50; a++) {
    const b = targetBrightness - a;
    best = Math.min(best, minBeetlesToMake(a) + minBeetlesToMake(b));
  }

  totalBeetles += best;
});

console.log(totalBeetles);
