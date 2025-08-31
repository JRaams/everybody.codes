const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/3.txt").text();

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
  const cycles: Record<number, [prevIndex: number, prevResult: number]> = {};
  let score = 1;
  let result = 0;

  let i = 0;
  while (i < EXP) {
    score *= N;
    score %= MOD;
    result += score;
    i++;

    if (score in cycles) {
      const [prevIndex, prevResult] = cycles[score];

      const period = i - prevIndex;
      const cycleSum = result - prevResult;
      const repetitions = Math.floor((EXP - i) / period);

      result += cycleSum * repetitions;
      i += period * repetitions;
    } else {
      cycles[score] = [i, result];
    }
  }

  return result;
}
