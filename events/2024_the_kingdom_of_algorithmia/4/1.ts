const lines = await Bun.file("1.txt").text();
const input = lines.split("\n").map(Number);

const minimum = Math.min(...input);

let strikes = 0;

for (let i = 0; i < input.length; i++) {
  strikes += input[i] - minimum;
}

console.log(strikes);
