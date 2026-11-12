import { expect, test } from "bun:test";
import { calibrationValue, parse } from "./clock";

test("parse", () => {
  const input = `hands 6:8:12
  direction CW:CCW:CW
  current 2:4:8
  move 9:7:4`;

  const result = parse(input);

  expect(result).toStrictEqual({
    hands: [6, 8, 12],
    directions: ["CW", "CCW", "CW"],
    currents: [2, 4, 8],
    moves: [9, 7, 4],
  });
});

test("e2e", () => {
  const testCases = [
    {
      input: `hands 6:8:12
      direction CW:CCW:CW
      current 2:4:8
      move 9:7:4`,
      expected: 5,
    },
    {
      input: `hands 6:8:12
      direction CW:CCW:CW
      current 1:2:2
      move 10:12:15`,
      expected: 7,
    },
    {
      input: `hands 6:8:12
      direction CW:CCW:CW
      current 1:2:2
      move 10:12:20`,
      expected: 9,
    },
  ];

  testCases.forEach(({ input, expected }) => {
    const parsedInput = parse(input);

    const result = calibrationValue(parsedInput);

    expect(result).toBe(expected);
  });
});
