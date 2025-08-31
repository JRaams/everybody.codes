const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/3.txt").text();

class Node {
  i: number;
  id: number;
  rank: number;
  symbol: string;
  parent: Node | null;
  left: Node | null;
  right: Node | null;

  constructor(i: number, id: number, rank: number, symbol: string) {
    this.i = i;
    this.id = id;
    this.rank = rank;
    this.symbol = symbol;
    this.parent = null;
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
      node.parent = null;
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

    node.parent = parent;

    if (node.rank < parent.rank) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  }

  getNodesPerLevel(): Map<number, Node[]> {
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
    const traversed = this.getNodesPerLevel();

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

  print(p: Node | null, indent: number): void {
    if (p === null) return;

    if (p.right) {
      this.print(p.right, indent + 4);
    }

    if (indent) {
      process.stdout.write(" ".repeat(indent));
    }

    if (p.right) {
      process.stdout.write(" /\n" + " ".repeat(indent));
    }

    process.stdout.write(p.symbol + "\n");

    if (p.left) {
      process.stdout.write(" ".repeat(indent) + " \\\n");
      this.print(p.left, indent + 4);
    }
  }

  search(id: number): Node[] {
    const queue: Node[] = [this.root!];
    const result: Node[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.id === id) {
        result.push(current);
      }
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    return result;
  }

  swap(oldNode: Node, newNode: Node): void {
    const oldParent = oldNode.parent;
    const newParent = newNode.parent;

    if (oldParent?.left?.i === oldNode.i) {
      oldParent.left = newNode;
      newNode.parent = oldParent;
    } else if (oldParent?.right?.i === oldNode.i) {
      oldParent.right = newNode;
      newNode.parent = oldParent;
    }

    if (newParent?.left?.i === newNode.i) {
      newParent.left = oldNode;
      oldNode.parent = newParent;
    } else if (newParent?.right?.i === newNode.i) {
      newParent.right = oldNode;
      oldNode.parent = newParent;
    }
  }
}

const leftTree = new Tree();
const rightTree = new Tree();

let i = 0;
lines.split("\n").forEach((line) => {
  if (line.startsWith("ADD")) {
    const [_, id, leftRank, leftSymbol, rightRank, rightSymbol] = line.match(
      /id=(\d+) left=\[(\d+),(.+)\] right=\[(\d+),(.+)\]/
    )!;

    leftTree.add(new Node(i++, Number(id), Number(leftRank), leftSymbol));
    rightTree.add(new Node(i++, Number(id), Number(rightRank), rightSymbol));
  } else if (line.startsWith("SWAP")) {
    const [_, id] = line.match(/SWAP (\d+)/)!;
    const leftNodes = leftTree.search(Number(id));
    const rightNodes = rightTree.search(Number(id));

    const [a, b] = [...leftNodes, ...rightNodes];
    if (!a || !b) return;

    console.log(line);
    console.log("left" + "=".repeat(30));
    leftTree.print(leftTree.root, 10);
    console.log("right" + "=".repeat(30));
    rightTree.print(rightTree.root, 10);

    if (leftTree.root?.i === a.i) {
      leftTree.root = b;
    } else if (leftTree.root?.i === b.i) {
      rightTree.root = a;
    }

    if (rightTree.root?.i === a.i) {
      rightTree.root = b;
    } else if (rightTree.root?.i === b.i) {
      rightTree.root = a;
    }

    if (leftNodes.find((node) => node.i === a.i)) {
      leftTree.swap(a, b);
    } else {
      rightTree.swap(a, b);
    }

    console.log("after swap");
    console.log("left" + "=".repeat(30));
    leftTree.print(leftTree.root, 10);
    console.log("right" + "=".repeat(30));
    rightTree.print(rightTree.root, 10);
  }
});

// console.log(rightTree.nodesById.get(1));

// leftTree.print(leftTree.root, 30);
const finalMessage = leftTree.readMessage() + rightTree.readMessage();

console.log(finalMessage);
