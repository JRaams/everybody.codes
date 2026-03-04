const input = await Bun.file("3.txt").text();

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

    return { id, r, g, b, s };
  });

const groups: Record<string, number[]> = {};

for (const scale of scales) {
  let key = "";

  if (scale.s <= 30) {
    key += "matte";
  } else if (scale.s >= 33) {
    key += "shiny";
  } else {
    continue;
  }

  if (scale.r > scale.g && scale.r > scale.b) {
    key += "red";
  } else if (scale.g > scale.r && scale.g > scale.b) {
    key += "green";
  } else if (scale.b > scale.r && scale.b > scale.g) {
    key += "blue";
  } else {
    continue;
  }

  if (groups[key] === undefined) {
    groups[key] = [];
  }
  groups[key].push(scale.id);
}

const largestGroup = Object.values(groups).sort(
  (a, b) => b.length - a.length,
)[0];

const sum = largestGroup.reduce((total, id) => total + id, 0);

console.log(sum);
