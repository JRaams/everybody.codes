export async function parsePlants(plantsRaw: string) {
  const plants: Plant[] = [];

  plantsRaw.split("\n\n").forEach((plantRaw) => {
    const [nameRaw, ...branchesRaw] = plantRaw.split("\n");

    const [id, thickness] = nameRaw.match(/(-?\d+)/g)!.map(Number);

    const plant: Plant = { id: id - 1, thickness, energy: 0, branches: [] };

    branchesRaw.forEach((branchRaw) => {
      if (branchRaw.startsWith("- free")) {
        plant.energy = 1;
      } else if (branchRaw.startsWith("- branch")) {
        const [toID, thickness] = branchRaw.match(/(-?\d+)/g)!.map(Number);
        plant.branches.push({ toID: toID - 1, thickness });
      }
    });

    plants.push(plant);
  });

  return plants;
}

export function simulatePlants(plants: Plant[]): void {
  plants.forEach((p) => {
    if (p.branches.length === 0) {
      return;
    }

    let newEnergy = 0;

    for (const branch of p.branches) {
      newEnergy += plants[branch.toID].energy * branch.thickness;
    }

    if (newEnergy >= p.thickness) {
      p.energy = newEnergy;
    } else {
      p.energy = 0;
    }
  });
}

export function findEnergy(plants: Plant[], testCase: number[]): number {
  const plantsCopy = structuredClone(plants);

  for (let i = 0; i < testCase.length; i++) {
    plantsCopy[i].energy = testCase[i];
  }

  simulatePlants(plantsCopy);

  return plantsCopy.at(-1)?.energy ?? 0;
}

type Plant = {
  id: number;
  thickness: number;
  energy: number;
  branches: Branch[];
};

type Branch = {
  toID: number;
  thickness: number;
};
