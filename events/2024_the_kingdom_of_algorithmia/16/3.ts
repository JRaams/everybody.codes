import { coinsWon, parse } from "./cat";

const txt = await Bun.file("3.txt").text();

const { turns, sequences } = parse(txt);

const cache = new Map<string, [min: number, max: number]>();

function findMinMaxScores(pulls = 0, offset = 0): [min: number, max: number] {
  const key = `${offset},${pulls}`;
  if (cache.has(key)) return cache.get(key)!;

  const score = pulls ? coinsWon(turns, sequences, pulls, offset) : 0;

  if (pulls === 256) {
    cache.set(key, [score, score]);
    return [score, score];
  }

  const [minA, maxA] = findMinMaxScores(pulls + 1, offset - 1);
  const [minB, maxB] = findMinMaxScores(pulls + 1, offset + 0);
  const [minC, maxC] = findMinMaxScores(pulls + 1, offset + 1);

  const max = Math.max(maxA, maxB, maxC);
  const min = Math.min(minA, minB, minC);

  cache.set(key, [score + min, score + max]);
  return [score + min, score + max];
}

const [min, max] = findMinMaxScores();

console.log(max, min);
