const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/input.txt").text();
const input = lines.trim().split("");

const colors = ["R", "G", "B"];
let color = 0;

let shoot = 0;

for (let i = 0; i < input.length; i++) {
  while (input[i] === colors[color]) {
    i++;
  }

  color = (color + 1) % 3;
  shoot++;
}

console.log(shoot);
