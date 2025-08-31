import { Node, Tree } from "./tree";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/3.txt").text();

const leftTree = new Tree();
const rightTree = new Tree();

lines.split("\n").forEach((line) => {
  if (line.startsWith("ADD")) {
    const [_, id, leftRank, leftSymbol, rightRank, rightSymbol] = line.match(
      /id=(\d+) left=\[(\d+),(.+)\] right=\[(\d+),(.+)\]/
    )!;

    leftTree.add(new Node(Number(id), Number(leftRank), leftSymbol));
    rightTree.add(new Node(Number(id), Number(rightRank), rightSymbol));
  } else if (line.startsWith("SWAP")) {
    const [_, id] = line.match(/SWAP (\d+)/)!;
    const leftNodes = leftTree.search(Number(id));
    const rightNodes = rightTree.search(Number(id));

    const [a, b] = [...leftNodes, ...rightNodes];
    if (!a || !b) throw new Error("SWAP requires two nodes");

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
  }
});

const finalMessage = leftTree.readMessage() + rightTree.readMessage();

console.log(finalMessage);
