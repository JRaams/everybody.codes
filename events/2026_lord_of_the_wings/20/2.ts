const txt = await Bun.file("2.txt").text();

const segments: Record<string, number> = {
  "0": 6,
  "1": 2,
  "2": 5,
  "3": 5,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 3,
  "8": 7,
  "9": 6,
  "+": 2,
  "-": 1,
  "=": 2,
  A: 6,
};

function evalBase11(expression: string) {
  const tokens = expression.match(/[0-9A]+|[+-]/gi)!;

  let total = parseInt(tokens[0], 11);

  for (let i = 1; i < tokens.length; i += 2) {
    const value = parseInt(tokens[i + 1], 11);
    total += tokens[i] === "+" ? value : -value;
  }

  return total;
}

function isCorrect(eq: string): boolean {
  const [left, right] = eq.split("=");
  return evalBase11(left) === evalBase11(right);
}

let total = 0;

txt
  .trim()
  .split("\n")
  .forEach((line) => {
    if (isCorrect(line)) {
      line.split("").forEach((char) => {
        const value = segments[char] ?? 0;
        total += value;
      });
    }
  });

console.log(total.toString(11));
