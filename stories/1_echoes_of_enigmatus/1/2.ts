const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/2.txt").text();

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
  let remainders: number[] = [];

  for (let i = EXP; i > EXP - 5; i--) {
    remainders.push(modPow(N, i, MOD));
  }

  return Number(remainders.join(""));
}

function modPow(N: number, EXP: number, MOD: number): number {
  let result = 1;

  while (EXP > 0) {
    if (EXP % 2 === 1) {
      result = (result * N) % MOD;
    }

    N *= N;
    N %= MOD;

    EXP = Math.floor(EXP / 2);
  }

  return result;
}
