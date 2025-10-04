export function parseGrid(txt: string) {
  const grid = txt.split("\n").map((line) => line.split(""));

  const nodes: Node[] = [];
  let start: Node | undefined;
  let end: Node | undefined;
  let index = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const symbol = grid[y][x];
      if (!symbol.match(/[0-9SE]/)) continue;

      let level = Number(symbol);
      if (isNaN(level)) level = 0;

      const node: Node = {
        y,
        x,
        index: index++,
        level,
        neighbours: [],
        symbol,
      };
      nodes.push(node);

      if (grid[y][x] === "S") start = node;
      else if (grid[y][x] === "E") end = node;
    }
  }

  nodes.forEach((node) => {
    for (const [dx, dy] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      const nx = node.x + dx;
      const ny = node.y + dy;

      const nnode = nodes.find((n) => n.x === nx && n.y === ny);
      if (nnode) node.neighbours.push(nnode);
    }
  });

  if (!start) throw new Error("Start not found");
  if (!end) throw new Error("End not found");

  return { start, end };
}

export function findShortestPath(start: Node, endSymbol: string): number {
  let result = Infinity;

  const queue: [Node, number][] = [[start, 0]];
  const seen = new Map<number, number>([[start.index, 0]]);

  while (queue.length > 0) {
    const [node, cost] = queue.shift()!;

    if (node.symbol === endSymbol) {
      result = Math.min(result, cost);
      // TODO: Priority queue..?
    }

    for (const neighbour of node.neighbours) {
      let levelChanges = Math.abs(node.level - neighbour.level);

      if (levelChanges > 5) {
        levelChanges = 10 - levelChanges;
      }

      const newCost = cost + 1 + levelChanges;

      if (seen.has(neighbour.index) && seen.get(neighbour.index)! < newCost)
        continue;

      seen.set(neighbour.index, newCost);
      queue.push([neighbour, newCost]);
    }
  }

  return result;
}

type Node = {
  symbol: string;
  y: number;
  x: number;
  index: number;
  level: number;
  neighbours: Node[];
};
