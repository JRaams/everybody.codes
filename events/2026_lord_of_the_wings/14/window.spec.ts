import { expect, test } from "bun:test";
import {
  findEdges,
  minimumBindings,
  minimumBindingsWithTwoCharges,
} from "./window";

test("findEdges", () => {
  const input = `AAAEEEFFFF
AADDDDDGFF
BACDDIGGFF
BABBIIIGGH
BBBBIIIIHH`;

  const edges = findEdges(input);

  expect(edges.length).toBe(67);
});

test("minimumBindings 12", () => {
  const input = `AAAEEEFFFF
  AADDDDDGFF
  BACDDIGGFF
  BABBIIIGGH
  BBBBIIIIHH`;

  const edges = findEdges(input);

  const result = minimumBindings(edges);

  expect(result).toBe(12);
});

test("minimumBindings 63", () => {
  const input = `IIIIIILOHHHHHHHHGGGGGQSRRRRKKK
  IIIIIILOOHHHHHHGGXGGGQSRRRRKKK
  PPPPILLLOOOODDHBGGGGGQSSRRRKKK
  PPZPLLLLFFOODDBBBBGGQQQSSRKKKK
  PPPPLLLLFFFONDDDBBMGGQQSSKKJJJ
  PPPCCCCCCFFONNDDMMMGQQQSSSKJJJ
  PCCCCCCCCFFNNDDDDMAAQQQSSSKKJJ
  PPCCECCCFFNNNNDADMAATQTTSSSJJJ
  PPEEEEECCFFNNAAAMMATTTTTSTSSSJ
  PPEEEEEEEFFNNNAAAAAATTTTTTSSJJ`;

  const edges = findEdges(input);

  const result = minimumBindings(edges);

  expect(result).toBe(63);
});

test("minimumBindingsWithTwoCharges 0", () => {
  const input = `AAAEEEFFFF
  AADDDDDGFF
  BACDDIGGFF
  BABBIIIGGH
  BBBBIIIIHH`;

  const edges = findEdges(input);

  const result = minimumBindingsWithTwoCharges(edges);

  expect(result).toBe(0);
});

test("minimumBindingsWithTwoCharges 21", () => {
  const input = `IIIIIILOHHHHHHHHGGGGGQSRRRRKKK
  IIIIIILOOHHHHHHGGXGGGQSRRRRKKK
  PPPPILLLOOOODDHBGGGGGQSSRRRKKK
  PPZPLLLLFFOODDBBBBGGQQQSSRKKKK
  PPPPLLLLFFFONDDDBBMGGQQSSKKJJJ
  PPPCCCCCCFFONNDDMMMGQQQSSSKJJJ
  PCCCCCCCCFFNNDDDDMAAQQQSSSKKJJ
  PPCCECCCFFNNNNDADMAATQTTSSSJJJ
  PPEEEEECCFFNNAAAMMATTTTTSTSSSJ
  PPEEEEEEEFFNNNAAAAAATTTTTTSSJJ`;

  const edges = findEdges(input);

  const result = minimumBindingsWithTwoCharges(edges);

  expect(result).toBe(21);
});
