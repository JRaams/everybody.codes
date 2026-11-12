import { calibrationValue, parse } from "./clock";

const input = await Bun.file("1.txt").text();

const parsedInput = parse(input);

console.log(calibrationValue(parsedInput));
