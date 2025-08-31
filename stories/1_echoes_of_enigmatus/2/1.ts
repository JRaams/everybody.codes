import { Node, Tree } from "./tree";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Bun.file(__dirname + "/1.txt").text();

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
