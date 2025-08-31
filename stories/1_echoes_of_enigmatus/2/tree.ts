let nodeId = 0;

export class Node {
  i: number;
  id: number;
  rank: number;
  symbol: string;
  parent: Node | null;
  left: Node | null;
  right: Node | null;

  constructor(id: number, rank: number, symbol: string) {
    this.i = nodeId++;
    this.id = id;
    this.rank = rank;
    this.symbol = symbol;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
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
