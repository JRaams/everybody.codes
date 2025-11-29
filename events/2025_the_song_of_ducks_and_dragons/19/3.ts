const text = await Bun.file("3.txt").text();

const input = text.split("\n").map((x) => x.split(",").map(Number));

const [x, y, _] = input.at(-1)!;

const flaps = Math.ceil((x + y) / 2);

console.log(flaps);
