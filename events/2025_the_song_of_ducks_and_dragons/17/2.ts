import { applyLava, parse } from "./vulcano";

let { grid, volcano } = await parse("2.txt");

let result = {
  R: 0,
  destroyed: 0,
};

for (let R = 1; ; R++) {
  const { newGrid, destroyed } = applyLava(grid, volcano, R);
  grid = newGrid;

  if (destroyed === 0) break;

  if (result.destroyed < destroyed) {
    result = { R, destroyed };
  }
}

console.log(result.R * result.destroyed);
