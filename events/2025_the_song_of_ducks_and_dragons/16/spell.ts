export function findSpellParts(input: number[]): number[] {
  const spellParts: number[] = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === 0) continue;

    spellParts.push(i + 1);

    for (let j = i; j < input.length; j += i + 1) {
      input[j]--;
    }
  }

  return spellParts;
}
