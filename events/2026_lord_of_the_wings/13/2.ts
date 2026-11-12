import { calibrationValue, parse } from "./clock";

const input = await Bun.file("2.txt").text();

let total = 0;

input
  .trim()
  .split("\n\n")
  .forEach((section) => {
    const parsedInput = parse(section);

    total += calibrationValue(parsedInput);
  });

console.log(total);
