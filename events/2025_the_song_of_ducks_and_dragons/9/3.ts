import { defaultDict } from "../../../util/defaultdict";

const lines = await Bun.file("3.txt").text();
const input = lines.split("\n").map((line) => line.split(":")[1]);

const nodeMap = defaultDict(() => new Array<number>());

for (let p1 = 0; p1 < input.length; p1++) {
  const seqp1 = input[p1];

  for (let p2 = p1 + 1; p2 < input.length; p2++) {
    const seqp2 = input[p2];

    input.forEach((seqc, c) => {
      if (c === p1 || c === p2) return;

      for (let i = 0; i < seqc.length; i++) {
        if (seqc[i] !== seqp1[i] && seqc[i] !== seqp2[i]) {
          return;
        }
      }

      nodeMap[c + 1].push(p1 + 1);
      nodeMap[p1 + 1].push(c + 1);

      nodeMap[c + 1].push(p2 + 1);
      nodeMap[p2 + 1].push(c + 1);
    });
  }
}

const seen = new Set<number>();
let largestFamily: number[] = [];

Object.keys(nodeMap).forEach((strKey) => {
  const key = Number(strKey);
  if (seen.has(key)) return;
  seen.add(key);

  const family: number[] = [key];

  for (let i = 0; i < family.length; i++) {
    const node = family[i];
    for (const neighbor of nodeMap[node]) {
      if (seen.has(neighbor)) continue;
      seen.add(neighbor);
      family.push(neighbor);
    }
  }

  if (largestFamily.length < family.length) {
    largestFamily = family;
  }
});

const sum = largestFamily.reduce((a, b) => a + b, 0);

console.log(sum);
