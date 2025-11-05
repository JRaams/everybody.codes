import { Complex } from "./complex";

const lines = await Bun.file("1.txt").text();
const [x, y] = lines.slice(3, -1).split(",").map(Number);
const A = new Complex(x, y);

let result = new Complex(0, 0);

for (let cycle = 0; cycle < 3; cycle++) {
  result = result.mul(result);
  result = result.div(new Complex(10, 10));
  result = result.add(A);
}

console.log(result.toString());
