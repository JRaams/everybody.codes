export async function parse(fileName: string): Promise<string[]> {
  const lines = await Bun.file(fileName).text();
  const input = lines.split("\n").map((line) => line.split(":")[1]);
  return input;
}

type Family = {
  imum: number;
  idad: number;
  ichild: number;
};

export function findFamilies(sequences: string[]): Family[] {
  const families: Family[] = [];

  for (let imum = 0; imum < sequences.length; imum++) {
    const mum = sequences[imum];

    for (let idad = imum + 1; idad < sequences.length; idad++) {
      const dad = sequences[idad];

      sequences.forEach((child, ichild) => {
        if (ichild === imum || ichild === idad) return;

        for (let i = 0; i < child.length; i++) {
          if (child[i] !== mum[i] && child[i] !== dad[i]) {
            return;
          }
        }

        families.push({ imum, idad, ichild });
      });
    }
  }

  return families;
}

export function calculateSimilarity(
  sequences: string[],
  family: Family
): number {
  let simMum = 0;
  let simDad = 0;

  const child = sequences[family.ichild];
  const mum = sequences[family.imum];
  const dad = sequences[family.idad];

  for (let i = 0; i < child.length; i++) {
    if (child[i] === mum[i]) simMum++;
    if (child[i] === dad[i]) simDad++;
  }

  return simMum * simDad;
}
