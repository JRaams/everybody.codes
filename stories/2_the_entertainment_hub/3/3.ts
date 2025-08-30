import { Dice } from "./dice";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const [diceRaw, gridRaw] = lines.trim().split("\n\n");

const dices = diceRaw.split("\n").map(Dice.fromInput);

const gridRows = gridRaw.split("\n");
const gridWidth = gridRows[0].length;
const grid = gridRows.join("");

const visited = new Set<number>();

dices.forEach((dice) => {
  let r = dice.roll().toString();

  let possible = new Set<number>();

  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === r) {
      visited.add(i);
      possible.add(i);
    }
  }

  while (possible.size > 0) {
    r = dice.roll().toString();

    const newPossible = new Set<number>();

    for (const pos of possible) {
      const next = [pos, pos - gridWidth, pos + gridWidth, pos - 1, pos + 1];
      const y = Math.floor(pos / gridWidth);
      const x = pos % gridWidth;

      next.forEach((nextPos) => {
        const ny = Math.floor(nextPos / gridWidth);
        const nx = nextPos % gridWidth;

        if (nextPos < 0 || nextPos >= grid.length) return;
        if (ny !== y && Math.abs(nx - x) > 0) return;
        if (grid[nextPos] !== r) return;

        newPossible.add(nextPos);
        visited.add(nextPos);
      });
    }

    possible = newPossible;
  }
});

console.log(visited.size);

// Generate PPM image

// const ppmHeader = `P3\n${gridWidth} ${gridRows.length}\n255\n`;
// let ppmContent = ppmHeader;

// for (let y = 0; y < gridRows.length; y++) {
//   for (let x = 0; x < gridWidth; x++) {
//     const pos = y * gridWidth + x;

//     if (visited.has(pos)) {
//       ppmContent += "0 0 0 ";
//     } else {
//       ppmContent += "255 255 255 ";
//     }
//   }
//   ppmContent += "\n";
// }

// await Bun.write(__dirname + "/output.ppm", ppmContent);
