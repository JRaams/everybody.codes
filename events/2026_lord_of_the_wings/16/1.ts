const txt = await Bun.file("1.txt").text();

const input = txt.trim().split("");

type Group = {
  shade: string;
  start: number;
  end: number;
};

function countFlips(input: string[]): number {
  let flips = 0;

  while (true) {
    // 1. Find first shade that appears in more than one group
    const groups: Group[] = [];
    const lastMap = new Map<string, number>();

    for (let start = 0; start < input.length;) {
      let end = start + 1;
      while (end < input.length && input[end] === input[start]) end++;

      const idx = groups.length;
      const shade = input[start];

      groups.push({ shade, start, end: end - 1 });
      lastMap.set(shade, idx);

      start = end;
    }

    // 2. Find the first and last group of that shade on the shelf
    const firstGroup = groups.findIndex((g, i) => lastMap.get(g.shade)! > i);
    if (firstGroup === -1) return flips;

    const lastGroup = lastMap.get(groups[firstGroup].shade)!;

    // 3. Next occurrance
    const start = groups[firstGroup].end + 1;
    const end = groups[lastGroup].end + 1;

    for (let left = start, right = end - 1; left < right; left++, right--) {
      const temp = input[left];
      input[left] = input[right];
      input[right] = temp;
    }

    flips++;
  }
}

console.log(countFlips(input));
