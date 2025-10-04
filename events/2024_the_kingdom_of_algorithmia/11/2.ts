const txt = await Bun.file("2.txt").text();

const conversionMap = new Map<string, string[]>();

txt.split("\n").forEach((line) => {
  const [key, value] = line.split(":");
  conversionMap.set(key, value.split(","));
});

let termites = ["Z"];

for (let day = 0; day < 10; day++) {
  const newTermites: string[] = [];

  termites.forEach((t) => {
    const conversions = conversionMap.get(t)!;
    newTermites.push(...conversions);
  });

  termites = newTermites;
}

console.log(termites.length);
