const txt = await Bun.file("1.txt").text();
const moves = txt.split(",");

let y = 0;
let maxHeight = 0;

moves.forEach((move) => {
  const dir = move[0];
  const steps = parseInt(move.slice(1));

  if (dir === "U") {
    y += steps;
  } else if (dir === "D") {
    y -= steps;
  }

  maxHeight = Math.max(maxHeight, y);
});

console.log(maxHeight);
