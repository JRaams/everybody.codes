const input = await Bun.file("3.txt").text();

function parse(input: string) {
  const lines = input
    .trim()
    .split("\n")
    .map((x) => x.trim());

  const portals = Number(lines.shift()!.match(/\d+/)![0]);
  lines.shift();
  const shortcuts = lines.map((x) => x.split(" ").map(Number));

  return { portals, shortcuts };
}

function calculateStrain(portals: number, shortcuts: number[][]) {
  // Setup distance table
  const dist: number[][] = [];

  for (let i = 0; i < portals; i++) {
    const row: number[] = [];
    for (let j = 0; j < portals; j++) {
      row.push(i === j ? 0 : Infinity);
    }
    dist.push(row);
  }

  // Add ring connections
  for (let i = 0; i < portals; i++) {
    //  Each portal was connected to the three nearest portals on either side.
    for (let j = -3; j <= 3; j++) {
      if (i === j || j === 0) continue;

      const next = (i + j + portals) % portals;
      dist[i][next] = 1;
      dist[next][i] = 1;
    }
  }

  // Add shortcuts
  for (const [a, b] of shortcuts) {
    const na = (a - 1 + portals) % portals;
    const nb = (b - 1 + portals) % portals;
    dist[na][nb] = 1;
    dist[nb][na] = 1;
  }

  // Floyd-Warshall to find distances
  for (let k = 0; k < portals; k++)
    for (let i = 0; i < portals; i++)
      for (let j = 0; j < portals; j++)
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);

  const strain = dist.flat().reduce((sum, d) => sum + d, 0);

  return strain;
}

function getCrystalCombinations(items: number[]): [number, number][][] {
  if (items.length === 0) return [[]];

  const [first, ...rest] = items;
  const results: [number, number][][] = [];

  for (let i = 0; i < rest.length; i++) {
    const partner = rest[i];
    const remaining = rest.filter((_, index) => index !== i);

    for (const pairs of getCrystalCombinations(remaining)) {
      results.push([[first, partner], ...pairs]);
    }
  }

  return results;
}

const { portals, shortcuts } = parse(input);

const initialStrain = calculateStrain(portals, []);
let largestResonance = 0;

const gap = portals / 8;
if (!Number.isInteger(gap))
  throw new Error("Expected portals / 8 to be a whole number");

for (let start = 0; start < gap; start++) {
  const crystals = Array.from({ length: 8 }, (_, i) => start + i * gap);
  const crystalCombinations = getCrystalCombinations(crystals);

  for (const crystalSets of crystalCombinations) {
    shortcuts.push(...crystalSets);

    const portalStrain = calculateStrain(portals, shortcuts);
    const resonance = initialStrain - portalStrain;

    if (largestResonance < resonance) {
      largestResonance = resonance;
    }

    shortcuts.splice(-4);
  }
}

console.log(largestResonance);
