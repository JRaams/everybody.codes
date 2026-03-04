const input = await Bun.file("2.txt").text();

let maxS = 0;

const scales = input
  .trim()
  .split("\n")
  .map((line) => {
    const [_id, rgb] = line.split(":");
    const [_r, _g, _b, _s] = rgb.split(" ");

    const id = Number(_id);
    const r = parseInt(_r.replaceAll("r", "0").replaceAll("R", "1"), 2);
    const g = parseInt(_g.replaceAll("g", "0").replaceAll("G", "1"), 2);
    const b = parseInt(_b.replaceAll("b", "0").replaceAll("B", "1"), 2);
    const s = parseInt(_s.replaceAll("s", "0").replaceAll("S", "1"), 2);

    maxS = Math.max(maxS, s);

    return { id, r, g, b, s };
  });

let lowestSum = Infinity;
let id = 0;

for (const scale of scales) {
  if (scale.s !== maxS) continue;

  const sum = scale.r + scale.g + scale.b;

  if (lowestSum > sum) {
    lowestSum = sum;
    id = scale.id;
  }
}

console.log(id);
