const input = await Bun.file("2.txt").text();
const lines = input
  .trim()
  .split("\n")
  .map((x) => x.split(",").map(Number));

let answer = 0;

for (const jumps of lines) {
  let current = 0;
  const seen = new Set<number>([0]);

  for (const jump of jumps) {
    let next = current - jump;

    if (next < 0 || seen.has(next)) {
      next = current + jump;

      while (seen.has(next)) {
        next++;
      }
    }

    seen.add(next);
    current = next;
  }

  answer += current;
}

console.log(answer);
