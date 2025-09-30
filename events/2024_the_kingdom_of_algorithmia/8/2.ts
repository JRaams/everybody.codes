const txt = await Bun.file("2.txt").text();

const priests = Number(txt.trim());
// const acolytes = 5;
// const available = 50;
const acolytes = 1111;
const available = 20240000;

let thickness = 1;
let blocks = 1;
let layer = 1;

while (blocks < available) {
  thickness = (thickness * priests) % acolytes;
  blocks += thickness * (2 * layer + 1);
  layer++;
}

const width = 2 * layer - 1;
const toBuy = blocks - available;

console.log(width * toBuy);
