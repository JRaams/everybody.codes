const txt = await Bun.file("3.txt").text();

const meteors = txt.split("\n").map((line) => line.split(" ").map(Number));

let result = 0;

meteors.forEach(([mx, my]) => {
  const optimalX = Math.floor(mx / 2);

  let optimalY = my - optimalX;
  if (mx % 2 === 1) optimalY--;

  for (const segment of [0, 1, 2]) {
    const dy = optimalY - segment;
    const dx = optimalX;

    if (dx < dy) {
      continue;
    }

    if (dx - dy < dy) {
      result += (1 + segment) * dy;
      return;
    }

    if ((dx + dy) % 3 === 0) {
      result += (1 + segment) * ((dx + dy) / 3);
      return;
    }
  }
});

console.log(result);
