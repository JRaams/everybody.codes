const input = await Bun.file("1.txt").text();

const scales = input
  .trim()
  .split("\n")
  .map((line) => {
    const [_id, rgb] = line.split(":");
    const [_r, _g, _b] = rgb.split(" ");

    const id = Number(_id);
    const r = parseInt(_r.replaceAll("r", "0").replaceAll("R", "1"), 2);
    const g = parseInt(_g.replaceAll("g", "0").replaceAll("G", "1"), 2);
    const b = parseInt(_b.replaceAll("b", "0").replaceAll("B", "1"), 2);

    return { id, r, g, b };
  });

let sum = 0;

for (const scale of scales) {
  if (scale.g > scale.r && scale.g > scale.b) {
    sum += scale.id;
  }
}

console.log(sum);
