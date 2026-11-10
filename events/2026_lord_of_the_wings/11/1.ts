const input = await Bun.file("1.txt").text();

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
    const next = (i + 1) % portals;
    dist[i][next] = 1;
    dist[next][i] = 1;
  }

  // Add shortcuts
  for (const [a, b] of shortcuts) {
    dist[a - 1][b - 1] = 1;
    dist[b - 1][a - 1] = 1;
  }

  // Floyd-Warshall to find distances
  for (let k = 0; k < portals; k++)
    for (let i = 0; i < portals; i++)
      for (let j = 0; j < portals; j++)
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);

  const strain = dist.flat().reduce((sum, d) => sum + d, 0);

  return strain;
}

const { portals, shortcuts } = parse(input);

const initialStrain = (portals * (portals * portals)) / 4;
const portalStrain = calculateStrain(portals, shortcuts);
const resonance = initialStrain - portalStrain;

console.log(resonance);
