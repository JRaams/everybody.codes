import { parse } from "./thread";

const pairs = await parse("2.txt");

let result = 0;

for (let i = 0; i < pairs.length; i++) {
  const [a, b] = pairs[i];

  for (let j = i + 1; j < pairs.length; j++) {
    const [c, d] = pairs[j];

    if (
      (a < c && c < b && b < d) || //
      (c < a && a < d && d < b)
    ) {
      result++;
    }
  }
}

console.log(result);
