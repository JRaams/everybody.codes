import { defaultDict } from "../../../util/defaultdict";

const lines = await Bun.file("3.txt").text();

type Cloud = {
  id: number;
  energy: number;
  connections: number[];
};

const allClouds: Cloud[] = [];

lines
  .trim()
  .split("\n")
  .forEach((line) => {
    const [id, energy, ...connections] = line
      .matchAll(/\d+/g)
      .toArray()
      .map(Number);

    allClouds.push({ id, energy, connections });
  });

function totalCloudEnergy(startId: number): number {
  const clouds = new Map();
  structuredClone(allClouds).forEach((cloud) => {
    clouds.set(cloud.id, cloud);
  });

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

    clouds.values().forEach((cloud) => {
      if (cloud.energy >= 1000000) {
        clouds.delete(cloud.id);

        for (const child of cloud.connections) {
          next[child][10] += 1;
        }
      }
    });

    impulses = next;
  }

  return clouds.values().reduce((sum, cloud) => sum + cloud.energy, 0);
}

let max = 0;

allClouds.forEach((cloud) => {
  const energy = totalCloudEnergy(cloud.id);
  max = Math.max(max, energy);
});

console.log(max);
