import { Sword } from "./sword";

const lines = await Bun.file("3.txt").text();

const swords = lines.split("\n").map((line) => new Sword(line));

swords.sort((a, b) => {
  if (a.quality !== b.quality) {
    return b.quality - a.quality;
  }

  for (let level = 0; level < a.segments.length; level++) {
    const aSegment = a.segments[level];
    const bSegment = b.segments[level];

    const aNumber = Number(aSegment.filter((x) => x).join(""));
    const bNumber = Number(bSegment.filter((x) => x).join(""));

    if (aNumber !== bNumber) {
      return bNumber - aNumber;
    }
  }

  return b.id - a.id;
});

const checkSum = swords.reduce(
  (total, sword, i) => total + sword.id * (i + 1),
  0
);

console.log(checkSum);
