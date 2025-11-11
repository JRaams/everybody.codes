const lines = await Bun.file("2.txt").text();
const input = lines.trim().split("");

let totalPairs = 0;

for (let i = 0; i < input.length - 1; i++) {
  const char = input[i];
  if (!char.match(/[A-Z]/)) continue;
  const lower = char.toLowerCase();

  for (let j = i + 1; j < input.length; j++) {
    if (input[j] === lower) {
      totalPairs++;
    }
  }
}

console.log(totalPairs);
