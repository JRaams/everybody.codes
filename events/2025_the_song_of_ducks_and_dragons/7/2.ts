import { defaultDict } from "../../../util/defaultdict";

const lines = await Bun.file("2.txt").text();
const [namesRaw, rulesRaw] = lines.split("\n\n");

// 1. Find names and rules
const names = namesRaw.split(",");
const rules = defaultDict(() => new Set<string>());

rulesRaw.split("\n").forEach((line) => {
  const [from, toRaw] = line.split(" > ");
  toRaw.split(",").forEach((to) => {
    rules[from].add(to);
  });
});

// 2. Find indexes of valid names
let result = 0;

nextName: for (const [index, name] of names.entries()) {
  for (let i = 0; i < name.length - 1; i++) {
    if (!rules[name[i]].has(name[i + 1])) {
      continue nextName;
    }
  }
  result += index + 1;
}

console.log(result);
