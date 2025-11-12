import { parse } from "./tome";

const lines = await Bun.file("3.txt").text();
const { names, rules } = parse(lines);

// 1. Filter out incompatible prefixes
const filteredPrefixes = names.filter((prefix) => {
  for (let i = 0; i < prefix.length - 1; i++) {
    if (!rules[prefix[i]].has(prefix[i + 1])) {
      return false;
    }
  }

  // Filter out names that are prefixes of other names (Khara / Kharax)
  if (names.find((x) => prefix !== x && prefix.startsWith(x))) {
    return false;
  }

  return true;
});

// 2. Find unique names between 7 and at most 11 characters
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

const result = filteredPrefixes.reduce((sum, x) => sum + numUniqueNames(x), 0);

console.log(result);
