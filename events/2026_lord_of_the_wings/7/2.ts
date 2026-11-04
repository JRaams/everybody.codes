import { defaultDict } from "../../../util/defaultdict";

const lines = await Bun.file("2.txt").text();

type Cloud = {
  id: number;
  energy: number;
  connections: number[];
};

const clouds = new Map<number, Cloud>();
let maxConnections = 0;
let maxConnectionsAt = 0;

lines
  .trim()
  .split("\n")
  .forEach((line) => {
    const [id, energy, ...connections] = line
      .matchAll(/\d+/g)
      .toArray()
      .map(Number);

    clouds.set(id, { id, energy, connections });

    if (connections.length > maxConnections) {
      maxConnections = connections.length;
      maxConnectionsAt = id;
    }
  });

function totalCloudEnergy(startId: number): number {
  let impulses = defaultDict(() => defaultDict(Number));
  impulses[startId][10] = 1;

  while (Object.keys(impulses).length > 0) {
    const next = defaultDict(() => defaultDict(Number));

    for (const [id, hitsPerStrength] of Object.entries(impulses)) {
      const cloud = clouds.get(Number(id));
      if (!cloud) continue;

      for (const [strengthStr, count] of Object.entries(hitsPerStrength)) {
        const strength = Number(strengthStr);

        cloud.energy += strength * count;

        if (strength === 1) continue;

        for (const child of cloud.connections) {
          next[child][strength - 1] += count;
        }
      }
    }

    impulses = next;
  }

  return clouds.values().reduce((sum, cloud) => sum + cloud.energy, 0);
}

console.log(totalCloudEnergy(maxConnectionsAt));
