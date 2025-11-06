const lines = await Bun.file("3.txt").text();
const input = lines.trim().split(",").map(Number);

const occurrences: Record<number, number> = {};

for (const size of input) {
  if (occurrences[size] === undefined) {
    occurrences[size] = 0;
  }

  occurrences[size] += 1;
}

const maxSets = Math.max(...Object.values(occurrences));

console.log(maxSets);
