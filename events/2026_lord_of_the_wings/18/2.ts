const txt = await Bun.file("2.txt").text();

const input = txt
  .trim()
  .split("\n")
  .map((x) => x.matchAll(/\d+/g).toArray().map(Number));

const maxX = input.at(-1)![0];
const heights = Array.from<number>({ length: maxX }).fill(0);

// The machine starts with the stacks from the data:
for (const [x, y, w] of input) {
  for (let i = 0; i < w; i++) {
    heights[x + i] = y;
  }
}

// The machine then fills every empty square that has a stack to its left and another to its right in the same row.
for (let x = 1; x < maxX; x++) {
  let hl = heights[x];
  let hr = heights[x];

  for (let l = 0; l < x; l++) {
    hl = Math.max(hl, heights[l]);
  }

  for (let r = x + 1; r <= maxX; r++) {
    hr = Math.max(hr, heights[r]);
  }

  heights[x] = Math.min(hl, hr);
}

// The finished mould includes all squares marked # or =
const sum = heights.reduce((a, b) => a + b, 0);
console.log(sum);
