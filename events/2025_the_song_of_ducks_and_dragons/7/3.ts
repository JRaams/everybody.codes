import { parse } from "./tome";

const lines = await Bun.file("3.txt").text();
const { names, rules } = parse(lines);

const cache = new Map<string, number>();

function numUniqueNames(name: string): number {
  const lastChar = name.at(-1)!;
  const key = `${lastChar},${name.length}`;
  if (cache.has(key)) return cache.get(key)!;

  let num = 0;

  if (name.length > 11) return 0;
  if (name.length >= 7) num++;

  for (const next of rules[lastChar]) {
    num += numUniqueNames(name + next);
  }

  cache.set(key, num);
  return num;
}

let result = 0;

names.forEach((prefix) => {
  // Filter out incompatible prefixes
  for (let i = 0; i < prefix.length - 1; i++) {
    if (!rules[prefix[i]].has(prefix[i + 1])) {
      return;
    }
  }

  // Filter out names that are prefixed by other names (Kharax -> Khara)
  if (names.find((x) => prefix !== x && prefix.startsWith(x))) {
    return;
  }

  result += numUniqueNames(prefix);
});

console.log(result);
