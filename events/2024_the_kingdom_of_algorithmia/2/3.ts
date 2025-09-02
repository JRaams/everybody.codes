const lines = await Bun.file("3.txt").text();

const [wordsRaw, textRaw] = lines.split("\n\n");
const words = wordsRaw.trim().split(":")[1].split(",");

const grid = textRaw
  .trim()
  .replaceAll("\n", " ")
  .split(" ")
  .map((x) => x.split(""));

const HEIGHT = grid.length;
const WIDTH = grid[0].length;
const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const highlights = Array.from({ length: HEIGHT }, () =>
  Array.from({ length: WIDTH }, () => ".")
);

for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    for (const [dy, dx] of DIRECTIONS) {
      nextWord: for (const word of words) {
        for (let w = 0; w < word.length; w++) {
          let [ny, nx] = [y + dy * w, x + dx * w];
          if (nx >= WIDTH) {
            nx %= WIDTH;
          }
          if (grid[ny]?.[nx] !== word[w]) {
            continue nextWord;
          }
        }

        for (let w = 0; w < word.length; w++) {
          let [ny, nx] = [y + dy * w, x + dx * w];
          if (nx >= WIDTH) {
            nx %= WIDTH;
          }
          highlights[ny][nx] = "#";
        }
      }
    }
  }
}

let result = 0;
for (const row of highlights) {
  for (const cell of row) {
    if (cell === "#") {
      result++;
    }
  }
}

console.log(result);

// const ppmHeader = `P3\n${WIDTH} ${HEIGHT}\n255\n`;
// let ppmContent = ppmHeader;

// for (let y = 0; y < HEIGHT; y++) {
//   for (let x = 0; x < WIDTH; x++) {
//     if (highlights[y][x] === "#") {
//       ppmContent += "0 0 0 ";
//     } else {
//       ppmContent += "255 255 255 ";
//     }
//   }
//   ppmContent += "\n";
// }

// await Bun.write(__dirname + "/output.ppm", ppmContent);
