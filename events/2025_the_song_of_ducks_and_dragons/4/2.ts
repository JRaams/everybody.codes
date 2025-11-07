const lines = await Bun.file("2.txt").text();

const gears = lines.split("\n").map(Number);

const ratio = gears[gears.length - 1] / gears[0];

console.log(Math.ceil(10000000000000 * ratio));
