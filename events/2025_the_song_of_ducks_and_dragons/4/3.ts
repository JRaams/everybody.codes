const lines = await Bun.file("3.txt").text();

const sequence = lines
  .split("\n")
  .map((x) => x.split("|"))
  .flat()
  .map(Number);

let totalRatio = 1;

for (let i = 0; i < sequence.length - 1; i += 2) {
  const ratio = sequence[i] / sequence[i + 1];
  totalRatio *= ratio;
}

console.log(Math.floor(100 * totalRatio));
