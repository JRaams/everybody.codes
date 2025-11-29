const text = await Bun.file("1.txt").text();
const input = text.split("\n").map((line) => line.split(""));

let pairs = 0;

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] !== "T") continue;

    if (input[y][x + 1] === "T") {
      pairs++;
    }

    if ((y + x) % 2 === 1) {
      if (input[y + 1]?.[x] === "T") {
        pairs++;
      }
    }
  }
}

console.log(pairs);
