import { parse } from "./glider";

const txt = await Bun.file("3.txt").text();

const { grid } = parse(txt);

const X_OFFSET = 3;
const x = grid[0].indexOf("S") + X_OFFSET;

let altitude = 384400 - X_OFFSET;
let y = 0;

while (altitude > 0) {
  y++;

  const symbol = grid[y % grid.length][x];

  if (symbol === "-") {
    altitude -= 2;
  } else if (symbol === "+") {
    altitude += 1;
  } else if (symbol === ".") {
    altitude -= 1;
  }
}

console.log(y);
