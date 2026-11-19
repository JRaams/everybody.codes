const txt = await Bun.file("3.txt").text();

const input = txt
  .trim()
  .split("\n")
  .map((line) => {
    const [x, y, w] = line.matchAll(/\d+/g).toArray().map(Number);
    return { x, y, w };
  })
  .sort((a, b) => b.y - a.y);

let area = 0;

let minX = Infinity;
let maxX = -Infinity;
let prevY = 0;

for (const { x, y, w } of input) {
  if (prevY !== 0) {
    const dx = maxX - minX;
    const dy = prevY - y;
    area += dx * dy;
  }

  minX = Math.min(minX, x);
  maxX = Math.max(maxX, x + w);
  prevY = y;
}

area += (maxX - minX) * prevY;

console.log(area);
