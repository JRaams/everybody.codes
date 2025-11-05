import { Complex } from "./complex";

const lines = await Bun.file("3.txt").text();
const [x, y] = lines.slice(3, -1).split(",").map(Number);
const A = new Complex(x, y);

const grid = Array.from({ length: 1001 }, () =>
  Array.from({ length: 1001 }, () => 0)
);
let points = 0;

for (let y = 0; y <= 1000; y++) {
  for (let x = 0; x <= 1000; x++) {
    const P = new Complex(x, y).add(A);

    let result = new Complex(0, 0);

    for (let cycle = 0; cycle < 100; cycle++) {
      result = result.mul(result);
      result = result.div(new Complex(100000, 100000));
      result = result.add(P);
    }

    if (Math.abs(result.x) < 1000000 && Math.abs(result.y) < 1000000) {
      grid[y][x] = 1;
      points++;
    }
  }
}

console.log(points);

// Generate PPM image
const ppmHeader = `P3\n1001 1001\n255\n`;
let ppmContent = ppmHeader;

for (let y = 0; y < 1001; y++) {
  for (let x = 0; x < 1001; x++) {
    if (grid[y][x] === 1) {
      ppmContent += "255 255 255 ";
    } else {
      ppmContent += "0 0 0 ";
    }
  }
  ppmContent += "\n";
}

await Bun.write(__dirname + "/3.ppm", ppmContent);
