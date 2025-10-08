import { lcmBulk } from "../../../util/math";
import { coinsWon, parse } from "./cat";

const txt = await Bun.file("2.txt").text();

const { turns, sequences } = parse(txt);

const cycleLength = lcmBulk(...sequences.map((s) => s.length))!;
const cycleCount = Math.floor(202420242024 / cycleLength);

let coinsPerCycle = 0;
for (let pull = 1; pull <= cycleLength; pull++) {
  coinsPerCycle += coinsWon(turns, sequences, pull);
}

let total = cycleCount * coinsPerCycle;

const remainingPulls = 202420242024 % cycleLength;
for (let pull = 1; pull <= remainingPulls; pull++) {
  total += coinsWon(turns, sequences, pull);
}

console.log(total);
