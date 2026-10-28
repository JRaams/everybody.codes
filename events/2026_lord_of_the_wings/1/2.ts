const lines = await Bun.file("2.txt").text();
const input = lines.trim().split(",").map(Number);

let result = 0;

input.forEach((pineCones) => {
  for (let i = 3; ; i++) {
    const frame = (i - 1) * 4;

    if (frame >= pineCones) {
      const diff = frame - pineCones;
      result += diff;
      break;
    }
  }
});

console.log(result);
