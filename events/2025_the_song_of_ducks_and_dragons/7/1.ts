import { defaultDict } from "../../../util/defaultdict";

const lines = await Bun.file("1.txt").text();
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

// 2. Find valid name
nextName: for (const name of names) {
  for (let i = 0; i < name.length - 1; i++) {
    if (!rules[name[i]].has(name[i + 1])) {
      continue nextName;
    }
  }
  console.log(name);
}
