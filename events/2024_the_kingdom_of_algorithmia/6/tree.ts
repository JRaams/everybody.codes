export class Tree {
  public fruitNodes = new Set<FruitNode>();

  constructor(input: string) {
    const lines = input.split("\n");
    const nodes = new Map<string, Node>();

    // First pass: create nodes
    for (const line of lines) {
      const [name, _] = line.split(":");
      const node = new Node(name);
      nodes.set(name, node);
    }

    // Second pass: add children
    for (const line of lines) {
      const [name, children] = line.split(":");
      const node = nodes.get(name)!;
      const childrenNames = children.split(",");

      for (const childName of childrenNames) {
        if (childName === "@") {
          const fruitNode = new FruitNode("@");
          fruitNode.parent = node;
          this.fruitNodes.add(fruitNode);
          continue;
        }

        const child = nodes.get(childName);
        if (child) {
          child.parent = node;
        }
      }
    }

    // Third pass: calculate paths to fruit nodes
    for (const fruitNode of this.fruitNodes) {
      fruitNode.calculatePathToRoot();
    }
  }

  public findUniquePath(): Node[] {
    const pathByLength = new Map<number, FruitNode[]>();

    for (const fruitNode of this.fruitNodes) {
      const path = fruitNode.path;
      if (!path) continue;

      if (!pathByLength.has(path.length)) {
        pathByLength.set(path.length, []);
      }

      pathByLength.get(path.length)!.push(fruitNode);
    }

    for (const paths of pathByLength.values()) {
      if (paths.length === 1 && paths[0]?.path) {
        return paths[0].path.reverse();
      }
    }

    throw new Error("No unique path found");
  }
}

export class Node {
  public name: string;
  public parent?: Node;

  constructor(name: string) {
    this.name = name;
    this.parent = undefined;
  }
}

export class FruitNode extends Node {
  public path: Node[] | undefined;

  constructor(name: string) {
    super(name);
  }

  public calculatePathToRoot(): void {
    const path: Node[] = [];
    const visited = new Set<string>();

    let current: Node = this;

    while (current.parent) {
      if (visited.has(current.parent.name)) {
        return;
      }

      path.push(current.parent);
      visited.add(current.parent.name);
      current = current.parent;
    }

    this.path = path;
  }
}
