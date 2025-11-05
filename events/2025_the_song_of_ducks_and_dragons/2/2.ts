import { Complex } from "./complex";

const lines = await Bun.file("2.txt").text();
const [x, y] = lines.slice(3, -1).split(",").map(Number);
const A = new Complex(x, y);

let points = 0;

for (let y = 0; y <= 1000; y += 10) {
  for (let x = 0; x <= 1000; x += 10) {
    const P = new Complex(x, y).add(A);

    let result = new Complex(0, 0);

    for (let cycle = 0; cycle < 100; cycle++) {
      result = result.mul(result);
      result = result.div(new Complex(100000, 100000));
      result = result.add(P);
    }

    if (Math.abs(result.x) < 1000000 && Math.abs(result.y) < 1000000) {
      points++;
    }
  }
}

console.log(points);
