const txt = await Bun.file("1.txt").text();
const input = txt.trim().split("\n").map(Number);

const DOTS = [10, 5, 3, 1];

let beetles = 0;

for (const targetBrightness of input) {
  let brightness = targetBrightness;

  DOTS.forEach((pattern) => {
    beetles += Math.floor(brightness / pattern);
    brightness %= pattern;
  });
}

console.log(beetles);
