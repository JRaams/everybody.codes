import { parse } from "./tome";

const lines = await Bun.file("2.txt").text();
const { names, rules } = parse(lines);

let result = 0;

names.forEach((name, index) => {
  for (let i = 0; i < name.length - 1; i++) {
    if (!rules[name[i]].has(name[i + 1])) {
      return;
    }
  }

  result += index + 1;
});

console.log(result);
