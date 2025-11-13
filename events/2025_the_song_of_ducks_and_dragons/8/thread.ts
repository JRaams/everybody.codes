export async function parse(fileName: string) {
  const lines = await Bun.file(fileName).text();

  const input = lines.trim().split(",").map(Number);

  const pairs: [number, number][] = [];

  for (let i = 0; i < input.length - 1; i++) {
    const [a, b] = [input[i], input[i + 1]];

    if (a < b) pairs.push([a, b]);
    else pairs.push([b, a]);
  }

  return pairs;
}
