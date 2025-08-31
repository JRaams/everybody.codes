const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/3.txt").text();
const snails = lines.split("\n").map((line) =>
  line
    .split(" ")
    .map((x) => x.split("=")[1])
    .map(Number)
);

const cycles = snails.map(([x, y]) => x + y - 1);
console.log(cycles);

// Thank you AOC 2020 day 13
let firstCommon = 0;
let step = 1;

for (let i = 0; i < cycles.length; i++) {
  const cycle = cycles[i];

  while ((firstCommon + snails[i][0]) % cycle !== 0) {
    firstCommon += step;
  }

  step *= cycle;
}

console.log(firstCommon);
