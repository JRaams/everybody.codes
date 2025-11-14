const lines = await Bun.file("2.txt").text();
const input = lines.split("\n").map((line) => line.split(":")[1]);

function findSimilarity(s1: string, s2: string): number {
  let similarity = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] === s2[i]) {
      similarity++;
    }
  }
  return similarity;
}

let similaritySum = 0;

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

      const sp1 = findSimilarity(seqp1, seqc);
      const sp2 = findSimilarity(seqp2, seqc);

      similaritySum += sp1 * sp2;
    });
  }
}

console.log(similaritySum);
