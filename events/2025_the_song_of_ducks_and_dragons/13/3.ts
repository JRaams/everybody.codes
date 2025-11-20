const lines = await Bun.file("3.txt").text();
const input = lines.split("\n");

const ranges: number[][] = Array.from({ length: input.length + 1 });
ranges[0] = [1, 1];

for (let i = 0; i < input.length; i++) {
  const newIndex = Math.floor(i / 2);

  if (i % 2 === 0) {
    ranges[newIndex + 1] = input[i].split("-").map(Number);
  } else {
    ranges[input.length - newIndex] = input[i].split("-").map(Number).reverse();
  }
}

let index = 202520252025;

const numberCount = ranges.reduce(
  (sum, [start, end]) => sum + Math.abs(start - end) + 1,
  0
);

index %= numberCount;

for (const [start, end] of ranges) {
  const numberCount = Math.abs(start - end) + 1;
  if (index >= numberCount) {
    index -= numberCount;
    continue;
  }

  if (start < end) {
    console.log(start + index);
  } else {
    console.log(start - index);
  }
  break;
}
