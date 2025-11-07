const lines = await Bun.file("1.txt").text();

const gears = lines.split("\n").map(Number);

const ratio = gears[0] / gears[gears.length - 1];

console.log(Math.floor(2025 * ratio));
