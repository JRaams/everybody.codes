import { defaultDict } from "../../../util/defaultdict";

export function parse(txt: string) {
  const [turnsRaw, symbolsRaw] = txt.split("\n\n");

  const turns: number[] = turnsRaw.split("\n")[0].split(",").map(Number);

  const sequences: string[][] = Array.from({ length: turns.length }, () => []);

  symbolsRaw.split("\n").forEach((line) => {
    for (let i = 0; i < line.length / 4; i++) {
      const face = line.slice(i * 4, i * 4 + 3).trim();
      if (face === "") continue;
      sequences[i].push(face);
    }
  });

  return { turns, sequences };
}

export function coinsWon(
  turns: number[],
  sequences: string[][],
  pull: number,
  offset: number = 0
): number {
  const symbols = defaultDict(() => 0);

  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i];
    const sequence = sequences[i];
    const index = (pull * turn + offset) % sequence.length;

    const face = sequence[index];
    symbols[face[0]]++;
    // skip the muzzles
    symbols[face[2]]++;
  }

  let coins = 0;

  Object.values(symbols).forEach((count) => {
    if (count >= 3) {
      coins += count - 2;
    }
  });

  return coins;
}
