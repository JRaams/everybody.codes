const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/1.txt").text();

let result = 0;

lines.split("\n").forEach((line) => {
  const [A, B, C, X, Y, Z, M] = line
    .split(" ")
    .map((x) => x.split("=")[1])
    .map(Number);

  const total = eni(A, X, M) + eni(B, Y, M) + eni(C, Z, M);
  result = Math.max(result, total);
});

console.log(result);

function eni(N: number, EXP: number, MOD: number): number {
  let score = 1;
  let remainders: number[] = [];

  for (let i = 0; i < EXP; i++) {
    score *= N;
    score %= MOD;
    remainders.unshift(score);
  }

  return Number(remainders.join(""));
}
