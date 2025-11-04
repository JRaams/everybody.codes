const lines = await Bun.file("3.txt").text();
const [namesRaw, movesRaw] = lines.split("\n\n");
const names = namesRaw.split(",");

movesRaw.split(",").forEach((move) => {
  const direction = move[0];
  const steps = Number(move.slice(1));

  let swapAt = direction === "R" ? steps : -steps;
  swapAt = (swapAt + names.length * 2) % names.length;

  let temp = names[0];
  names[0] = names[swapAt];
  names[swapAt] = temp;
});

console.log(names[0]);
