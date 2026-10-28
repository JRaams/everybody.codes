import { defaultDict } from "../../../util/defaultdict";

const lines = await Bun.file("2.txt").text();

const input = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(" "));

let result = 0;

input.forEach((group) => {
  const stronger = defaultDict(Number);

  group.forEach((comparison) => {
    let [min, max] = [0, 0];

    if (comparison.includes("<")) {
      [min, max] = comparison.split("<").map(Number);
    } else {
      [max, min] = comparison.split(">").map(Number);
    }

    stronger[min]--;
    stronger[max]++;
  });

  const checksum = Object.entries(stronger)
    .sort((a, b) => b[1] - a[1])
    .map((x) => x[0])
    .join("");

  result += Number(checksum);
});

console.log(result);
