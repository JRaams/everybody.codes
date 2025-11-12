const lines = await Bun.file("3.txt").text();
const input = lines.trim();

function countPairs(input: string): number {
  let pairs = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (!char.match(/[A-Z]/)) continue;
    const lower = char.toLowerCase();

    for (let j = i - 1000; j <= i + 1000; j++) {
      if (input[j] === lower) {
        pairs++;
      }
    }
  }

  return pairs;
}

const repeat1 = countPairs(input);
const repeat2 = countPairs(input.repeat(2));
const pairsPerCycle = repeat2 - repeat1;

console.log(repeat1 + pairsPerCycle * 999);
