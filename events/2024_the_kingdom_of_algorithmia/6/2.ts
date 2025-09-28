import { Tree } from "./tree";

const input = await Bun.file("2.txt").text();

const tree = new Tree(input);

console.log(
  tree
    .findUniquePath()
    .map((node) => node.name[0])
    .join("") + "@"
);
