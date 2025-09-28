import { Tree } from "./tree";

const input = await Bun.file("1.txt").text();

const tree = new Tree(input);

console.log(
  tree
    .findUniquePath()
    .map((node) => node.name)
    .join("") + "@"
);
