const lines = await Bun.file("2.txt").text();

const input = lines
  .trim()
  .split("\n")
  .map((x) => x.matchAll(/\d+/g).toArray().map(Number));

type Participant = {
  id: number;
  times: number[];
  totalTime: number;
};

const participants: Participant[] = [];

input.forEach(([id, _quest, _part, time]) => {
  let p = participants.find((x) => x.id === id);

  if (!p) {
    p = {
      id,
      times: [],
      totalTime: 0,
    };
    participants.push(p);
  }

  p.times.push(time);
  p.totalTime += time;
});

participants.sort((a, b) => {
  if (a.times.length === b.times.length) {
    return a.totalTime - b.totalTime;
  }

  return b.times.length - a.times.length;
});

let checksum = 0;

for (let i = 0; i < participants.length; i++) {
  checksum += participants[i].totalTime * (i + 1);
}

console.log(checksum);
