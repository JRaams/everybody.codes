const lines = await Bun.file("1.txt").text();
const input = lines.split("\n").map(Number);

const list = Array.from({ length: input.length + 1 });
list[0] = 1;

for (let i = 0; i < input.length; i++) {
  const newIndex = Math.floor(i / 2);

  if (i % 2 === 0) {
    list[newIndex + 1] = input[i];
  } else {
    list[input.length - newIndex] = input[i];
  }
}

let index = 2025;

index %= input.length + 1;

console.log(list[index]);
