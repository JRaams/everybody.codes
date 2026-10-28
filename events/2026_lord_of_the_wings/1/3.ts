const lines = await Bun.file("3.txt").text();
const input = lines.trim().split(",").map(Number);

let result = 0;

input.forEach((pineCones) => {
  for (let i = 3; ; i += 2) {
    const square = i * i - 1;

    if (square >= pineCones) {
      const diff = square - pineCones;
      result += diff;
      break;
    }
  }
});

console.log(result);
