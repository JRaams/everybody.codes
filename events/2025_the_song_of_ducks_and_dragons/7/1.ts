import { parse } from "./tome";

const lines = await Bun.file("1.txt").text();
const { names, rules } = parse(lines);

names.forEach((name) => {
  for (let i = 0; i < name.length - 1; i++) {
    if (!rules[name[i]].has(name[i + 1])) {
      return;
    }
  }

  console.log(name);
});
