import { defaultDict } from "../../../util/defaultdict";

const lines = await Bun.file("1.txt").text();

const input = lines
  .trim()
  .split("\n")
  .map((x) => x.matchAll(/\d+/g).toArray().map(Number));

const timePerParticipant = defaultDict(Number);

input.forEach(([id, _quest, _part, time]) => {
  timePerParticipant[id] += time;
});

const totalTimes = Object.values(timePerParticipant);

totalTimes.sort((a, b) => a - b);

let checksum = 0;

for (let i = 0; i < totalTimes.length; i++) {
  checksum += totalTimes[i] * (i + 1);
}

console.log(checksum);
