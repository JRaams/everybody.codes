const lines = await Bun.file("1.txt").text();
const input = lines.trim().split("");

let totalPairs = 0;

for (let i = 0; i < input.length - 1; i++) {
  const char = input[i];
  if (char !== "A") continue;

  for (let j = i + 1; j < input.length; j++) {
    if (input[j] === "a") {
      totalPairs++;
    }
  }
}

console.log(totalPairs);
