const lines = await Bun.file("1.txt").text();
const input = lines.trim().split(",").map(Number);

const unique = Array.from(new Set(input));
const sum = unique.reduce((a, b) => a + b, 0);

console.log(sum);
