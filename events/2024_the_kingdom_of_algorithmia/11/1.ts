const txt = await Bun.file("1.txt").text();

const conversionMap = new Map<string, string[]>();

txt.split("\n").forEach((line) => {
  const [key, value] = line.split(":");
  conversionMap.set(key, value.split(","));
});

let termites = ["A"];

for (let day = 0; day < 4; day++) {
  const newTermites: string[] = [];

  termites.forEach((type) => {
    const conversions = conversionMap.get(type)!;
    newTermites.push(...conversions);
  });

  termites = newTermites;
}

console.log(termites.length);
