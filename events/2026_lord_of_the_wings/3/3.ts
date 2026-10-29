const lines = await Bun.file("3.txt").text();
const input = lines.trim().split("\n");

let result = 0;

function toDecimal(standard: string[], vote: string[]): number {
  let decimal = 0;

  for (let i = 0; i < vote.length; i++) {
    const ds = Number(standard[i % standard.length]);
    const dv = Number(vote[i]);
    const digit = dv * Math.pow(ds, i);
    decimal += digit;
  }

  return decimal;
}

input.forEach((record) => {
  const [standardStr, voteStr] = record.slice(5).split(" ");

  const standard = standardStr.split("").reverse();
  const vote = voteStr.split("").reverse();

  const decimal = toDecimal(standard, vote);

  for (let x = Number(voteStr) - 1; x > 0; x--) {
    if (toDecimal(standard, x.toString().split("").reverse()) === decimal) {
      return;
    }
  }

  result += decimal;
});

console.log(result);
