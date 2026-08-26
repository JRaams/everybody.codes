const input = await Bun.file("3.txt").text();
const lines = input
  .trim()
  .split("\n")
  .map((x) => x.split(",").map(Number));

let answer = 0;

for (const jumps of lines) {
  let current = 0;
  const seen = new Set<number>([0]);

  const belowPairs: [min: number, max: number][] = [];
  const abovePairs: [min: number, max: number][] = [];
  let isBelow = true;

  function hasOverlap(next: number): boolean {
    const pairs = isBelow ? belowPairs : abovePairs;

    for (const [min, max] of pairs) {
      const nextInside = min < next && next < max;
      const currentInside = min < current && current < max;

      if (nextInside != currentInside) {
        return true;
      }
    }

    return false;
  }

  nextJump: for (const jump of jumps) {
    let next = current - jump;

    const backwardsHasOverlap = hasOverlap(next);

    if (next < 0 || seen.has(next) || backwardsHasOverlap) {
      next = current + jump;

      let forwardsHasOverlap = hasOverlap(next);

      while (seen.has(next) || forwardsHasOverlap) {
        next++;

        if (next > 1000) {
          continue nextJump;
        }

        forwardsHasOverlap = hasOverlap(next);
      }
    }

    const min = Math.min(current, next);
    const max = Math.max(current, next);

    if (isBelow) {
      belowPairs.push([min, max]);
    } else {
      abovePairs.push([min, max]);
    }
    isBelow = !isBelow;

    seen.add(next);
    current = next;
  }

  answer += current;
}

console.log(answer);
