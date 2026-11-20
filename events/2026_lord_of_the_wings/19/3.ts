const txt = await Bun.file("3.txt").text();

const sum = txt
  .split("")
  .filter((ch) => ch === "C" || ch === "M" || ch === "Y").length;

const base = Math.floor(sum / 3);
const leftover = sum % 3;

const piles = [base, base, base];
for (let i = 0; i < leftover; i++) {
  piles[i]++;
}

const product = piles[0] * piles[1] * piles[2];

console.log(product);

// 1. Each non-black square can end up as one of three colours in the final window.
// 2. The answer multiplies the sizes of the three biggest colour groups together.
// 3. For a fixed total, three groups that are all the same size give the biggest result.
// 4. If two groups differ by 2 or more, moving one square from the bigger group to the
//    smaller one makes the result bigger.
// 5. So the best split is the one where all three groups are as close to equal as possible.
