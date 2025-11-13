import { parse } from "./thread";

const pairs = await parse("3.txt");
let max = 0;

for (let a = 1; a <= 256; a++) {
  for (let b = a + 1; b <= 256; b++) {
    let numThreadsCut = 0;

    for (let i = 0; i < pairs.length; i++) {
      const [c, d] = pairs[i];

      if (
        (a < c && c < b && b < d) || //
        (c < a && a < d && d < b)
      ) {
        numThreadsCut++;
      }
    }

    if (numThreadsCut > max) {
      max = numThreadsCut;
    }
  }
}

console.log(max);
