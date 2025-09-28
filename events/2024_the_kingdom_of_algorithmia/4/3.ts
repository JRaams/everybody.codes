const lines = await Bun.file("3.txt").text();
const input = lines.split("\n").map(Number).sort();

const middle = input[Math.floor(input.length / 2)];

let strikes = 0;

for (let i = 0; i < input.length; i++) {
  strikes += Math.abs(input[i] - middle);
}

console.log(strikes);
