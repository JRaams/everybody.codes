import { parse, findFamilies } from "./dna";

const input = await parse("3.txt");

const families = findFamilies(input);

const links = Array.from({ length: input.length }, () => new Array<number>());

families.forEach((family) => {
  links[family.imum].push(family.ichild);
  links[family.idad].push(family.ichild);
  links[family.ichild].push(family.imum, family.idad);
});

const seen = new Set<number>();
let largestFamily: number[] = [];

for (let i = 0; i < links.length; i++) {
  if (seen.has(i)) continue;
  seen.add(i);

  const family: number[] = [i];

  for (let j = 0; j < family.length; j++) {
    const node = family[j];

    for (const neighbor of links[node]) {
      if (seen.has(neighbor)) continue;
      seen.add(neighbor);
      family.push(neighbor);
    }
  }

  if (largestFamily.length < family.length) {
    largestFamily = family;
  }
}

const sum = largestFamily.reduce((a, b) => a + b + 1, 0);

console.log(sum);
