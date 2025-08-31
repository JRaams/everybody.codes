const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/1.txt").text();
const snails = lines.split("\n").map((line) =>
  line
    .split(" ")
    .map((x) => x.split("=")[1])
    .map(Number)
);

for (let day = 0; day < 100; day++) {
  for (let i = 0; i < snails.length; i++) {
    let [x, y] = snails[i];
    const mod = x + y - 1;
    x++;
    y--;

    if (y < 1) {
      y = mod;
      x = 1;
    }

    snails[i] = [x, y];
  }
}

let total = 0;

snails.forEach(([x, y]) => {
  total += x + 100 * y;
});

console.log(total);
