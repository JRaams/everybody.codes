import { Node, Tree } from "./tree";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/2.txt").text();

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
    const [a, b] = [
      ...leftTree.search(Number(id)),
      ...rightTree.search(Number(id)),
    ];
    if (!a || !b) throw new Error("SWAP requires two nodes");

    const tempRank = a.rank;
    const tempSymbol = a.symbol;

    a.rank = b.rank;
    a.symbol = b.symbol;

    b.rank = tempRank;
    b.symbol = tempSymbol;
  }
});

const finalMessage = leftTree.readMessage() + rightTree.readMessage();

console.log(finalMessage);
