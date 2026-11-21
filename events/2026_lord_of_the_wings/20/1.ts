const txt = await Bun.file("1.txt").text();

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
};

let total = 0;

txt
  .trim()
  .split("\n")
  .forEach((line) => {
    const isValid = eval(line.replace("=", "=="));
    if (!isValid) return;

    line.split("").forEach((char) => {
      const value = segments[char] ?? 0;
      total += value;
    });
  });

console.log(total);
