const lines = await Bun.file("2.txt").text();
const input = lines.trim().split(",").map(Number);

const unique = Array.from(new Set(input)).sort((a, b) => a - b);
const sum = unique.slice(0, 20).reduce((a, b) => a + b, 0);

console.log(sum);
