const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().repeat(100000).split("");

const COLORS = ["R", "G", "B"];
const left = input.slice(0, input.length / 2);
const right = input.slice(input.length / 2);

let shoot = 0;
let color = 0;

while (left.length > 0) {
  const balloon = left.shift();

  if (balloon === COLORS[color]) {
    if ((left.length + right.length) % 2 !== 0) {
      right.shift();
    }
  }

  if (right.length > left.length) {
    left.push(right.shift()!);
  }

  color = (color + 1) % 3;
  shoot++;
}

console.log(shoot);
