const lines = await Bun.file("2.txt").text();
const input = lines.split("\n").map(Number);

let round = 0;

// First phase
for (; ; round++) {
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
for (; ; round++) {
  let moved = false;

  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] < input[i + 1]) {
      moved = true;
      input[i]++;
      input[i + 1]--;
    }
  }

  if (!moved) break;
}

console.log(round);
