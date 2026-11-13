import { MinPriorityQueue } from "@datastructures-js/priority-queue";

export function findEdges(input: string): Edge[] {
  const grid = input
    .trim()
    .split("\n")
    .map((x) => x.trim());

  const rows = grid.length;
  const cols = grid[0].length;
  const edges: Edge[] = [];

  function addHorizontal(y: number, x: number, top: string, bottom: string) {
    edges.push({ o: "h", y, x, top, bottom });
  }

  function addVertical(y: number, x: number, left: string, right: string) {
    edges.push({ o: "v", y, x, left, right });
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const piece = grid[y][x];

      // Frame edges along the top and left.
      if (y === 0) addHorizontal(0, x, FRAME, piece);
      if (x === 0) addVertical(y, 0, FRAME, piece);

      // The right edge: either a boundary between pieces or the frame.
      if (x === cols - 1) {
        addVertical(y, x + 1, piece, FRAME);
      } else if (piece !== grid[y][x + 1]) {
        addVertical(y, x + 1, piece, grid[y][x + 1]);
      }

      // The bottom edge: either a boundary between pieces or the frame.
      if (y === rows - 1) {
        addHorizontal(y + 1, x, piece, FRAME);
      } else if (piece !== grid[y + 1][x]) {
        addHorizontal(y + 1, x, piece, grid[y + 1][x]);
      }
    }
  }

  return edges;
}

export function minimumBindings(edges: Edge[]): number {
  const graph = buildGraph(edges);

  return minimumBindingsOnGraph(graph, new Set());
}

export function minimumBindingsWithTwoCharges(edges: Edge[]): number {
  const graph = buildGraph(edges);

  const pieces = [...graph.keys()].filter((piece) => piece !== FRAME);

  let best = Infinity;

  for (let i = 0; i < pieces.length - 1; i++) {
    for (let j = i + 1; j < pieces.length; j++) {
      const bindings = minimumBindingsOnGraph(
        graph,
        new Set([pieces[i], pieces[j]]),
      );

      best = Math.min(best, bindings);
    }
  }

  return best;
}

function minimumBindingsOnGraph(
  graph: Graph,
  chargedPieces: ReadonlySet<string>,
): number {
  const queue = new MinPriorityQueue<Candidate>((candidate) => candidate.cost);
  const connected = new Set<string>([FRAME]);
  let total = 0;

  function addCandidatesFrom(node: string): void {
    for (const [neighbor, seamLength] of graph.get(node)!.entries()) {
      if (connected.has(neighbor)) continue;

      const nodeIsCharged = node !== FRAME && chargedPieces.has(node);

      const neighborIsCharged =
        neighbor !== FRAME && chargedPieces.has(neighbor);

      queue.enqueue({
        neighbor,
        cost: nodeIsCharged || neighborIsCharged ? 0 : seamLength,
      });
    }
  }

  addCandidatesFrom(FRAME);

  while (connected.size < graph.size) {
    const candidate = queue.dequeue();
    if (candidate === null) {
      throw new Error("Queue unexpectedly became empty.");
    }

    if (connected.has(candidate.neighbor)) continue;

    connected.add(candidate.neighbor);
    total += candidate.cost;
    addCandidatesFrom(candidate.neighbor);
  }

  return total;
}

function buildGraph(edges: Edge[]): Graph {
  const graph: Graph = new Map();

  function ensureNode(node: string): void {
    if (!graph.has(node)) graph.set(node, new Map());
  }

  function addConnection(a: string, b: string): void {
    ensureNode(a);
    ensureNode(b);

    const neighborsA = graph.get(a)!;
    const neighborsB = graph.get(b)!;

    neighborsA.set(b, (neighborsA.get(b) ?? 0) + 1);
    neighborsB.set(a, (neighborsB.get(a) ?? 0) + 1);
  }

  for (const edge of edges) {
    if (edge.o === "h") {
      addConnection(edge.top, edge.bottom);
    } else {
      addConnection(edge.left, edge.right);
    }
  }

  return graph;
}

type Edge =
  | {
      o: "h";
      y: number;
      x: number;
      top: string;
      bottom: string;
    }
  | {
      o: "v";
      y: number;
      x: number;
      left: string;
      right: string;
    };

type Graph = Map<string, Map<string, number>>;

type Candidate = {
  neighbor: string;
  cost: number;
};

const FRAME = "FRAME";
