const lines = await Bun.file("1.txt").text();
const input = lines.split("\n").map(Number);

let round = 0;

// First phase
for (; round < 10; round++) {
  let moved = false;

  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] > input[i + 1]) {
      moved = true;
      input[i]--;
      input[i + 1]++;
    }
  }

  if (!moved) break;
}

// Second phase
for (; round < 10; round++) {
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] < input[i + 1]) {
      input[i]++;
      input[i + 1]--;
    }
  }
}

const checksum = input.map((x, i) => (i + 1) * x).reduce((a, b) => a + b, 0);

console.log(checksum);
