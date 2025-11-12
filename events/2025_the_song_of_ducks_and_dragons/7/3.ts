import { defaultDict } from "../../../util/defaultdict";

const lines = await Bun.file("3.txt").text();
const [prefixesRaw, rulesRaw] = lines.split("\n\n");

// 1. Find prefixes and rules
let prefixes = prefixesRaw.split(",");
const rules = defaultDict(() => new Set<string>());

rulesRaw.split("\n").forEach((line) => {
  const [from, toRaw] = line.split(" > ");
  toRaw.split(",").forEach((to) => {
    rules[from].add(to);
  });
});

// 2. Filter out incompatible prefixes
prefixes = prefixes.filter((prefix) => {
  for (let i = 0; i < prefix.length - 1; i++) {
    if (!rules[prefix[i]].has(prefix[i + 1])) {
      return false;
    }
  }
  return true;
});

// 3. Find unique names betwen 7 and at most 11 characters
const uniqueNames = new Set<string>();

for (const prefix of prefixes) {
  const queue = [prefix];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.length > 11) continue;
    if (current.length >= 7) uniqueNames.add(current);

    const lastChar = current.at(-1);
    if (lastChar === undefined) continue;

    for (const rule of rules[lastChar]) {
      queue.push(current + rule);
    }
  }
}

console.log(uniqueNames.size);
