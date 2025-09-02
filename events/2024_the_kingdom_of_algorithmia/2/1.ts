const lines = await Bun.file("1.txt").text();

const [wordsRaw, text] = lines.split("\n\n");
const words = wordsRaw.trim().split(":")[1].split(",");

let result = 0;

for (const word of words) {
  const matches = text.matchAll(new RegExp(word, "g")).toArray();
  result += matches.length;
}

console.log(result);
