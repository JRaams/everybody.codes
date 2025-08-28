const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().repeat(100).split("");

const COLORS = ["R", "G", "B"];

let color = 0;
let shoot = 0;

while (input.length > 0) {
  const ballon = input.shift();

  if (ballon === COLORS[color]) {
    if (input.length % 2 === 1) {
      const nextIndex = (input.length + 1) / 2 - 1;
      input.splice(nextIndex, 1);
    }
  }

  color = (color + 1) % 3;
  shoot++;
}

console.log(shoot);
