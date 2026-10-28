const lines = await Bun.file("1.txt").text();
const input = lines.trim().split(",").map(Number);

let result = 0;

input.forEach((pineCones) => {
  for (let i = 0; ; i++) {
    const square = i * i;

    if (square >= pineCones) {
      const diff = square - pineCones;
      result += diff;
      break;
    }
  }
});

console.log(result);
