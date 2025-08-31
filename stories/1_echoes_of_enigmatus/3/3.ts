const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/3.txt").text();
const snails = lines.split("\n").map((line) =>
  line
    .split(" ")
    .map((x) => x.split("=")[1])
    .map(Number)
);

// Thank you AOC 2020 day 13
let firstCommon = 0;
let step = 1;

for (let i = 0; i < snails.length; i++) {
  const [x, y] = snails[i];
  const cycle = x + y - 1;

  while ((firstCommon + x) % cycle !== 0) {
    firstCommon += step;
  }

  step *= cycle;
}

console.log(firstCommon);
