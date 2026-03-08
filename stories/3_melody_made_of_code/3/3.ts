const input = await Bun.file("3.txt").text();

export type Node = {
  id: number;
  plugColor: string;
  plugShape: string;
  leftColor: string;
  leftShape: string;
  rightColor: string;
  rightShape: string;

  plug?: Node;
  left?: Node;
  right?: Node;
};

type Ref = { value: Node };

export function parse(input: string): Node[] {
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

      const [plugColor, plugShape] = plugStr.split(" ");
      const [leftColor, leftShape] = leftStr.split(" ");
      const [rightColor, rightShape] = rightStr.split(" ");

      nodes.push({
        id: Number(idStr),
        plugColor,
        plugShape,
        leftColor,
        leftShape,
        rightColor,
        rightShape,
      });
    });

  return nodes;
}

function bond(
  socket: Node,
  toInsert: Node,
  side: "left" | "right",
): "strong" | "weak" | null {
  if (side === "left") {
    const colorMatch = socket.leftColor === toInsert.plugColor;
    const shapeMatch = socket.leftShape === toInsert.plugShape;

    if (colorMatch && shapeMatch) {
      return "strong";
    } else if (colorMatch || shapeMatch) {
      return "weak";
    }
  } else {
    const colorMatch = socket.rightColor === toInsert.plugColor;
    const shapeMatch = socket.rightShape === toInsert.plugShape;

    if (colorMatch && shapeMatch) {
      return "strong";
    } else if (colorMatch || shapeMatch) {
      return "weak";
    }
  }

  return null;
}

function insert(current: Node, toInsert: Ref): boolean {
  if (!current.left && bond(current, toInsert.value, "left")) {
    current.left = toInsert.value;
    toInsert.value.plug = current;
    console.log(`Added node ${toInsert.value.id} to left of ${current.id}`);
    return true;
  }

  if (current.left) {
    if (
      bond(current, current.left, "left") === "weak" &&
      bond(current, toInsert.value, "left") === "strong"
    ) {
      console.log(
        `overwrite weak ${current.left.id} with strong ${toInsert.value.id} for left ${current.id}`,
      );
      const temp = current.left;
      current.left = toInsert.value;
      toInsert.value = temp;
    } else if (insert(current.left, toInsert)) {
      return true;
    }
  }

  if (!current.right && bond(current, toInsert.value, "right")) {
    current.right = toInsert.value;
    toInsert.value.plug = current;
    console.log(`Added node ${toInsert.value.id} to right of ${current.id}`);
    return true;
  }

  if (current.right) {
    if (
      bond(current, current.right, "right") === "weak" &&
      bond(current, toInsert.value, "right") === "strong"
    ) {
      console.log(
        `overwrite weak ${current.right.id} with strong ${toInsert.value.id} for right ${current.id}`,
      );
      const temp = current.right;
      current.right = toInsert.value;
      toInsert.value = temp;
    } else if (insert(current.right, toInsert)) {
      return true;
    }
  }

  return false;
}

const nodes = parse(input);

const root = nodes[0];
console.log(`${root.id} becomes root`);

for (let i = 1; i < nodes.length; i++) {
  const toInsert = { value: nodes[i] };
  while (!insert(root, toInsert)) {
    console.log("Chain reaction");
  }
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

const path = traverse(root);

let checksum = 0;

for (let i = 0; i < path.length; i++) {
  checksum += (i + 1) * path[i].id;
}

console.log(checksum);
