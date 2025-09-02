const lines = await Bun.file("3.txt").text();
const input = lines.split("");

const potions: Record<string, number> = {
  A: 0,
  B: 1,
  C: 3,
  D: 5,
  x: 0,
};

let result = 0;

for (let i = 0; i < input.length; i += 3) {
  const [a, b, c] = [input[i], input[i + 1], input[i + 2]];

  result += potions[a] + potions[b] + potions[c];

  let xs = 0;
  if (a === "x") xs++;
  if (b === "x") xs++;
  if (c === "x") xs++;

  if (xs === 1) {
    result += 2;
  } else if (xs === 0) {
    result += 6;
  }
}

console.log(result);
