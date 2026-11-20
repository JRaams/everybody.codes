import { defaultDict } from "../../../util/defaultdict";

const txt = await Bun.file("2.txt").text();

const blocks = txt.trim().split("\n\n");

const [grid1, grid2] = blocks.map((x) => {
  return x
    .trim()
    .split("\n")
    .map((y) => y.split(""));
});

function mix(a: string, b: string): string {
  if (a === "K" || b === "K") return "K";
  else if ((a === "C" && b === "M") || (a === "M" && b === "C")) return "B";
  else if ((a === "C" && b === "Y") || (a === "Y" && b === "C")) return "G";
  else if ((a === "M" && b === "Y") || (a === "Y" && b === "M")) return "R";
  return a;
}

function permutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items];

  return items.flatMap((item, index) =>
    permutations(items.filter((_, i) => i !== index)).map((rest) => [
      item,
      ...rest,
    ]),
  );
}

let max = 0;

for (const order of permutations(["1", "2", "3", "4"])) {
  const mapping: Record<string, string> = {};
  mapping[order[0]] = "C";
  mapping[order[1]] = "M";
  mapping[order[2]] = "Y";
  mapping[order[3]] = "K";

  const occurrance = defaultDict(Number);

  for (let y = 0; y < grid1.length; y++) {
    for (let x = 0; x < grid1[y].length; x++) {
      const a = grid1[y][x];
      const b = grid2[y][x];
      const bMapped = mapping[b];
      const m = mix(a, bMapped);
      occurrance[m]++;
    }
  }

  const result = Object.values(occurrance)
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((a, b) => a * b, 1);

  if (max < result) {
    max = result;
  }
}

console.log(max);
