const lines = await Bun.file("2.txt").text();
const input = lines.trim().split("\n");

let result = 0;

input.forEach((record) => {
  const [standard, vote] = record
    .slice(4)
    .split(" ")
    .map((x) => x.split("").reverse());

  for (let i = 0; i < vote.length; i++) {
    const ds = Number(standard[i % standard.length]);
    const dv = Number(vote[i]);
    const digit = dv * Math.pow(ds, i);
    result += digit;
  }
});

console.log(result);
