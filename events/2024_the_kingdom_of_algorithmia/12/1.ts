import { parseDiagram } from "./parse";

const txt = await Bun.file("1.txt").text();

const targets = parseDiagram(txt);

let result = 0;

targets.forEach((target) => {
  for (let power = 1; ; power++) {
    for (const segment of [0, 1, 2]) {
      let [y, x] = [segment, 0];

      // Diagonally upward 45 degrees
      x += power;
      y += power;

      // Horizonal
      x += power;

      // Diagonally downward 45 degrees
      const diffy = target[0] - y;
      const diffx = target[1] - x;

      if (diffx + diffy === 0) {
        const rank = (1 + segment) * power;
        result += rank;
        return;
      }
    }
  }
});

console.log(result);
