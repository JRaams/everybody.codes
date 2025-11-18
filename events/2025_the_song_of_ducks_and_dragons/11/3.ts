const lines = await Bun.file("3.txt").text();
const input = lines.split("\n").map(Number);

const sum = input.reduce((a, b) => a + b, 0);

const avg = sum / input.length;

const rounds = input.reduce((a, b) => a + Math.abs(b - avg) / 2, 0);

console.log(rounds);
