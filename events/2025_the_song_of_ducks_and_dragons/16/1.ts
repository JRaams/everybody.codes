const lines = await Bun.file("1.txt").text();

const input = lines.split(",").map(Number);

const blocks = input.reduce((sum, num) => sum + Math.floor(90 / num), 0);

console.log(blocks);
