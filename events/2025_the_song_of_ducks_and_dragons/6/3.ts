const lines = await Bun.file("3.txt").text();
const input = lines.trim().repeat(1000).split("");

let totalPairs = 0;

for (let i = 0; i < input.length; i++) {
  const char = input[i];
  if (!char.match(/[A-Z]/)) continue;
  const lower = char.toLowerCase();

  const left = Math.max(0, i - 1000);
  const right = Math.min(input.length, i + 1001);

  for (let j = left; j < right; j++) {
    if (input[j] === lower) {
      totalPairs++;
    }
  }
}

console.log(totalPairs);
