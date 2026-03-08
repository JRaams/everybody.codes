const input = await Bun.file("1.txt").text();

type Node = {
  id: number;
  plugStr: string;
  leftStr: string;
  rightStr: string;

  plug?: Node;
  left?: Node;
  right?: Node;
};

function parse(input: string): Node[] {
  const nodes: Node[] = [];

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const match = line.match(
        /id=(\d+), plug=(.+), leftSocket=(.+), rightSocket=(.+), data=(.+)/,
      );

      if (!match) throw new Error("Unable to match: " + line);

      const [_, idStr, plugStr, leftStr, rightStr] = match;
      nodes.push({ id: Number(idStr), plugStr, leftStr, rightStr });
    });

  return nodes;
}

function insert(node: Node, current: Node | undefined): boolean {
  if (!current) return false;

  if (!current.left && current.leftStr === node.plugStr) {
    current.left = node;
    node.plug = current;
    console.log(`Added node ${node.id} to left of ${current.id}`);
    return true;
  }

  if (insert(node, current.left)) {
    return true;
  }

  if (!current.right && current.rightStr === node.plugStr) {
    current.right = node;
    node.plug = current;
    console.log(`Added node ${node.id} to right of ${current.id}`);
    return true;
  }

  if (insert(node, current.right)) {
    return true;
  }

  return false;
}

function traverse(current: Node): Node[] {
  const output: Node[] = [];

  if (current.left) {
    output.push(...traverse(current.left));
  }

  output.push(current);

  if (current.right) {
    output.push(...traverse(current.right));
  }

  return output;
}

const nodes = parse(input);

const root = nodes[0];

for (let i = 1; i < nodes.length; i++) {
  insert(nodes[i], root);
}

const path = traverse(root);

let checksum = 0;

for (let i = 0; i < path.length; i++) {
  checksum += (i + 1) * path[i].id;
}

console.log(checksum);
