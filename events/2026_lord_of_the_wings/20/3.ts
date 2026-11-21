const txt = await Bun.file("3.txt").text();

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

const minusOne: Record<string, string[]> = {
  "0": [],
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": ["5"],
  "7": ["1"],
  "8": ["0", "6", "9", "A"],
  "9": ["3", "5"],
  A: [],
  "+": ["-"],
  "-": [],
};

const plusOne: Record<string, string[]> = {
  "0": ["8"],
  "1": ["7"],
  "2": [],
  "3": ["9"],
  "4": [],
  "5": ["6", "9"],
  "6": ["8"],
  "7": [],
  "8": [],
  "9": ["8"],
  A: ["8"],
  "+": [],
  "-": ["+"],
};

const sameCount: Record<string, string[]> = {
  "0": ["6", "9", "A"],
  "1": [],
  "2": ["3"],
  "3": ["2", "5"],
  "4": [],
  "5": ["3"],
  "6": ["0", "9", "A"],
  "7": [],
  "8": [],
  "9": ["0", "6", "A"],
  A: ["0", "6", "9"],
  "+": [],
  "-": [],
};

function evalBase11(expression: string): number {
  const tokens = expression.match(/[0-9A]+|[+-]/gi)!;

  let total = parseInt(tokens[0], 11);

  for (let i = 1; i < tokens.length; i += 2) {
    const val = parseInt(tokens[i + 1], 11);
    total += tokens[i] === "+" ? val : -val;
  }

  return total;
}

function isCorrect(eq: string): boolean {
  const [left, right] = eq.split("=");
  return evalBase11(left) === evalBase11(right);
}

function canBeFixed(eq: string): boolean {
  if (isCorrect(eq)) return true;

  const chars = eq.split("");

  for (let i = 0; i < chars.length; i++) {
    const s1 = chars[i];
    if (s1 === " " || s1 === "=") continue;

    // Try moving within the same symbol
    for (const replacement of sameCount[s1]) {
      const modified = [...chars];
      modified[i] = replacement;
      if (isCorrect(modified.join(""))) return true;
    }

    // Try moving from s1 to some other symbol s2
    for (const s1Prime of minusOne[s1]) {
      for (let j = 0; j < chars.length; j++) {
        if (j === i) continue;

        const s2 = chars[j];
        if (s2 === " " || s2 === "=") continue;

        for (const s2Prime of plusOne[s2]) {
          const modified = [...chars];
          modified[i] = s1Prime;
          modified[j] = s2Prime;
          if (isCorrect(modified.join(""))) return true;
        }
      }
    }
  }

  return false;
}

let total = 0;

txt
  .trim()
  .split("\n")
  .forEach((line) => {
    if (canBeFixed(line)) {
      line.split("").forEach((char) => {
        const value = segments[char] ?? 0;
        total += value;
      });
    }
  });

console.log(total.toString(11));
