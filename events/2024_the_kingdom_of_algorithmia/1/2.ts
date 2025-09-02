const lines = await Bun.file("2.txt").text();
const input = lines.split("");

const potions: Record<string, number> = {
  A: 0,
  B: 1,
  C: 3,
  D: 5,
  x: 0,
};

let result = 0;

for (let i = 0; i < input.length; i += 2) {
  const [a, b] = [input[i], input[i + 1]];

  result += potions[a] + potions[b];

  if (a !== "x" && b !== "x") {
    result += 2;
  }
}

console.log(result);
