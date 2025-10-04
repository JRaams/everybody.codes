import { MinHeap } from "@datastructures-js/heap";

export function parseGrid(txt: string) {
  const grid = txt.split("\n").map((line) => line.split(""));

  const nodes: Node[][] = [];
  let start: Node | undefined;
  let end: Node | undefined;
  let index = 0;

  for (let y = 0; y < grid.length; y++) {
    const row: Node[] = [];
    nodes.push(row);

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
      row[x] = node;

      if (grid[y][x] === "S") start = node;
      else if (grid[y][x] === "E") end = node;
    }
  }

  nodes.flat().forEach((node) => {
    for (const [dx, dy] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      const nx = node.x + dx;
      const ny = node.y + dy;

      const nnode = nodes[ny]?.[nx];
      if (nnode) node.neighbours.push(nnode);
    }
  });

  if (!start) throw new Error("Start not found");
  if (!end) throw new Error("End not found");

  return { start, end };
}

export function findShortestPath(startNode: Node, endSymbol: string): number {
  const heap = new MinHeap<[Node, number]>((a) => a[1]);
  heap.push([startNode, 0]);

  const seen = new Map<number, number>([[startNode.index, 0]]);

  while (!heap.isEmpty()) {
    const [node, cost] = heap.pop()!;

    if (node.symbol === endSymbol) {
      return cost;
    }

    for (const neighbour of node.neighbours) {
      let levelChanges = Math.abs(node.level - neighbour.level);

      if (levelChanges > 5) {
        levelChanges = 10 - levelChanges;
      }

      const newCost = cost + 1 + levelChanges;

      const lowestCostSoFar = seen.get(neighbour.index);
      if (lowestCostSoFar !== undefined && newCost >= lowestCostSoFar) continue;

      seen.set(neighbour.index, newCost);
      heap.push([neighbour, newCost]);
    }
  }

  throw new Error("No path found");
}

type Node = {
  symbol: string;
  y: number;
  x: number;
  index: number;
  level: number;
  neighbours: Node[];
};
