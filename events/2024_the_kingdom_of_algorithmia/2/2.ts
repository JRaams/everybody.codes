const lines = await Bun.file("2.txt").text();

const [wordsRaw, textRaw] = lines.split("\n\n");
const words = wordsRaw.trim().split(":")[1].split(",");

for (let i = words.length - 1; i >= 0; i--) {
  words.push(words[i].split("").reverse().join(""));
}

const text = textRaw.trim().replaceAll("\n", " ").split(" ");

let result = 0;

text.forEach((x) => {
  let symbols = new Set<number>();
  for (let i = 0; i <= x.length; i++) {
    for (let j = i + 1; j <= x.length; j++) {
      const slice = x.slice(i, j);
      if (words.includes(slice)) {
        for (let k = i; k < j; k++) {
          symbols.add(k);
        }
      }
    }
  }
  result += symbols.size;
});

console.log(result);
