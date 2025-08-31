const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/1.txt").text();

class Node {
  id: number;
  rank: number;
  symbol: string;
  left: Node | null;
  right: Node | null;

  constructor(id: number, rank: number, symbol: string) {
    this.id = id;
    this.rank = rank;
    this.symbol = symbol;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  root: Node | null;

  constructor() {
    this.root = null;
  }

  add(node: Node): void {
    if (this.root === null) {
      this.root = node;
      return;
    }

    let current = this.root;
    let parent = this.root;

    while (current !== null) {
      parent = current;
      if (node.rank < current.rank) {
        current = current.left!;
      } else {
        current = current.right!;
      }
    }

    if (node.rank < parent.rank) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  }

  traverse(): Map<number, Node[]> {
    const result = new Map<number, Node[]>();

    const queue: [node: Node, level: number][] = [[this.root!, 0]];

    while (queue.length > 0) {
      const [node, level] = queue.shift()!;
      if (node.left) {
        queue.push([node.left, level + 1]);
      }
      if (node.right) {
        queue.push([node.right, level + 1]);
      }

      if (!result.has(level)) {
        result.set(level, []);
      }

      result.get(level)!.push(node);
    }

    return result;
  }

  readMessage(): string {
    let levelWithMostNodes = 0;
    let maxNodes = 0;
    const traversed = this.traverse();

    for (const [level, nodes] of traversed) {
      if (nodes.length > maxNodes) {
        maxNodes = nodes.length;
        levelWithMostNodes = level;
      }
    }

    const message = traversed
      .get(levelWithMostNodes)!
      .map((node) => node.symbol);

    return message.join("");
  }
}

const leftTree = new Tree();
const rightTree = new Tree();

lines.split("\n").forEach((line) => {
  const [_, id, leftRank, leftSymbol, rightRank, rightSymbol] = line.match(
    /id=(\d+) left=\[(\d+),(.+)\] right=\[(\d+),(.+)\]/
  )!;

  leftTree.add(new Node(Number(id), Number(leftRank), leftSymbol));
  rightTree.add(new Node(Number(id), Number(rightRank), rightSymbol));
});

const finalMessage = leftTree.readMessage() + rightTree.readMessage();

console.log(finalMessage);
