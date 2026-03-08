const input = await Bun.file("3.txt").text();

class Node {
  id: number;
  plugColor: string;
  plugShape: string;
  leftColor: string;
  leftShape: string;
  rightColor: string;
  rightShape: string;

  left?: Node;
  right?: Node;

  constructor(line: string) {
    const match = line.match(
      /id=(\d+), plug=(.+), leftSocket=(.+), rightSocket=(.+), data=(.+)/,
    );

    if (!match) throw new Error("Unable to match: " + line);

    const [_, idStr, plugStr, leftStr, rightStr] = match;

    const [plugColor, plugShape] = plugStr.split(" ");
    const [leftColor, leftShape] = leftStr.split(" ");
    const [rightColor, rightShape] = rightStr.split(" ");

    this.id = Number(idStr);
    this.plugColor = plugColor;
    this.plugShape = plugShape;
    this.leftColor = leftColor;
    this.leftShape = leftShape;
    this.rightColor = rightColor;
    this.rightShape = rightShape;
  }

  public bond(plug: Node, side: "left" | "right"): "strong" | "weak" | null {
    const color = side === "left" ? this.leftColor : this.rightColor;
    const shape = side === "left" ? this.leftShape : this.rightShape;

    const colorMatch = color === plug.plugColor;
    const shapeMatch = shape === plug.plugShape;

    if (colorMatch && shapeMatch) {
      return "strong";
    } else if (colorMatch || shapeMatch) {
      return "weak";
    }

    return null;
  }

  public traverse(): Node[] {
    const output: Node[] = [];

    if (this.left) {
      output.push(...this.left.traverse());
    }

    output.push(this);

    if (this.right) {
      output.push(...this.right.traverse());
    }

    return output;
  }

  public insert(toInsert: NodeRef): boolean {
    if (!this.left && this.bond(toInsert.value, "left") !== null) {
      this.left = toInsert.value;
      return true;
    }

    if (this.left) {
      if (
        this.bond(this.left, "left") === "weak" &&
        this.bond(toInsert.value, "left") === "strong"
      ) {
        [this.left, toInsert.value] = [toInsert.value, this.left];
        // No return to ensure the replaced node with weak bond continues inserting from the same location as toInsert
      } else if (this.left.insert(toInsert)) {
        return true;
      }
    }

    if (!this.right && this.bond(toInsert.value, "right") !== null) {
      this.right = toInsert.value;
      return true;
    }

    if (this.right) {
      if (
        this.bond(this.right, "right") === "weak" &&
        this.bond(toInsert.value, "right") === "strong"
      ) {
        [this.right, toInsert.value] = [toInsert.value, this.right];
        return false;
      } else if (this.right.insert(toInsert)) {
        return true;
      }
    }

    return false;
  }
}

type NodeRef = { value: Node };

const nodes = input
  .trim()
  .split("\n")
  .map((line) => new Node(line));

const root = nodes[0];

for (let i = 1; i < nodes.length; i++) {
  const toInsert: NodeRef = { value: nodes[i] };
  while (!root.insert(toInsert)) {}
}

const path = root.traverse();

let checksum = 0;
for (let i = 0; i < path.length; i++) {
  checksum += (i + 1) * path[i].id;
}

console.log(checksum);
