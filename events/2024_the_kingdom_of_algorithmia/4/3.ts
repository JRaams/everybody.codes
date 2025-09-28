const lines = await Bun.file("3.txt").text();
const input = lines.split("\n").map(Number);

let min = Infinity;
let max = -Infinity;

for (let i = 0; i < input.length; i++) {
  min = Math.min(min, input[i]);
  max = Math.max(max, input[i]);
}

let minStrikes = Infinity;

for (let i = min; i <= max; i++) {
  let strikes = 0;
  for (let j = 0; j < input.length; j++) {
    strikes += Math.abs(input[j] - i);
  }
  minStrikes = Math.min(minStrikes, strikes);
}

console.log(minStrikes);
