const lines = await Bun.file("1.txt").text();
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

const result =
  findSimilarity(input[0], input[2]) * findSimilarity(input[1], input[2]);

console.log(result);
