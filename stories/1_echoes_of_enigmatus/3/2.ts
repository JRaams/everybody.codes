const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/2.txt").text();
const snails = lines.split("\n").map((line) =>
  line
    .split(" ")
    .map((x) => x.split("=")[1])
    .map(Number)
);

let day = 1;

while (true) {
  let snailsOnY1 = 0;

  for (let i = 0; i < snails.length; i++) {
    let [x, y] = snails[i];
    const mod = x + y - 1;
    x++;
    y--;

    if (y < 1) {
      y = mod;
      x = 1;
    }

    if (y === 1) {
      snailsOnY1++;
    }

    snails[i] = [x, y];
  }

  if (snailsOnY1 === snails.length) {
    break;
  }

  day++;
}

console.log(day);
