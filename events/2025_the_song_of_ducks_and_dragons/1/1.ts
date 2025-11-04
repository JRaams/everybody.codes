const lines = await Bun.file("1.txt").text();
const [namesRaw, movesRaw] = lines.split("\n\n");
const names = namesRaw.split(",");

let index = 0;

movesRaw.split(",").forEach((move) => {
  const direction = move[0];
  const steps = Number(move.slice(1));

  if (direction === "R") {
    index = Math.min(names.length - 1, index + steps);
  } else if (direction === "L") {
    index = Math.max(0, index - steps);
  }
});

console.log(names[index]);
