const lines = await Bun.file("1.txt").text();

type Cloud = {
  id: number;
  energy: number;
  connections: number[];
  impulse: number;
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

    clouds.set(id, { id, energy, connections, impulse: 0 });

    if (connections.length > maxConnections) {
      maxConnections = connections.length;
      maxConnectionsAt = id;
    }
  });

const queue: [Cloud, number][] = [[clouds.get(maxConnectionsAt)!, 5]];

while (queue.length > 0) {
  const [cloud, strength] = queue.shift()!;

  if (!cloud || strength === 0) continue;

  cloud.impulse += strength;

  cloud.connections.forEach((connection) => {
    queue.push([clouds.get(connection)!, strength - 1]);
  });
}

let result = 0;

clouds.values().forEach((cloud) => {
  result += cloud.energy + cloud.impulse;
});

console.log(result);
