import { defaultDict } from "../../../util/defaultdict";

const txt = await Bun.file("1.txt").text();

const [grid1, grid2] = txt
  .trim()
  .split("\n\n")
  .map((x) =>
    x
      .trim()
      .split("\n")
      .map((y) => y.split("")),
  );

function mix(a: string, b: string): string {
  if (a === "K" || b === "K") return "K";
  else if ((a === "C" && b === "M") || (a === "M" && b === "C")) return "B";
  else if ((a === "C" && b === "Y") || (a === "Y" && b === "C")) return "G";
  else if ((a === "M" && b === "Y") || (a === "Y" && b === "M")) return "R";
  return a;
}

const occurrance = defaultDict(Number);

for (let y = 0; y < grid1.length; y++) {
  for (let x = 0; x < grid1[y].length; x++) {
    const a = grid1[y][x];
    const b = grid2[y][x];
    const m = mix(a, b);
    occurrance[m]++;
  }
}

const result = Object.values(occurrance)
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((a, b) => a * b, 1);

console.log(result);
