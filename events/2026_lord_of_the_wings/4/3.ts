import { defaultDict } from "../../../util/defaultdict";

const lines = await Bun.file("3.txt").text();

const input = lines
  .trim()
  .split("\n")
  .map((x) => x.matchAll(/\d+/g).toArray().map(Number));

type Participant = {
  id: number;
  times: Record<string | symbol, number[]>;
  points: number;
};

const participants: Participant[] = [];
let maxQ = 0;

// 1. Parse participants

input.forEach(([id, quest, part, time]) => {
  let p = participants.find((x) => x.id === id);

  if (!p) {
    p = {
      id,
      times: defaultDict<number[]>(() => []),
      points: 0,
    };
    participants.push(p);
  }

  p.times[quest][part - 1] = time;

  maxQ = Math.max(maxQ, quest);
});

// 2. Presum times

for (let q = 1; q <= maxQ; q++) {
  for (const p of participants) {
    if (p.times[q][0] !== undefined && p.times[q][1] !== undefined) {
      p.times[q][1] += p.times[q][0];
    }
    if (p.times[q][1] !== undefined && p.times[q][2] !== undefined) {
      p.times[q][2] += p.times[q][1];
    }
  }
}

// 3. Determine points

for (let q = 1; q <= maxQ; q++) {
  [
    { part: 0, initPoints: 50 },
    { part: 1, initPoints: 100 },
    { part: 2, initPoints: 150 },
  ].forEach(({ part, initPoints }) => {
    participants.sort((a, b) => {
      const scoreA = a.times[q][part] ?? 0;
      const scoreB = b.times[q][part] ?? 0;
      return scoreA - scoreB;
    });

    const completed = participants.filter(
      (p) => p.times[q][part] !== undefined,
    );

    let previousScore = -1;
    let groupStartAt = 0;

    for (let i = 0; i < completed.length; i++) {
      const p = completed[i];
      const score = p.times[q][part];

      if (score !== previousScore) {
        groupStartAt = i;
        previousScore = score;
      }

      const award = initPoints - groupStartAt;

      if (award <= 0) break;

      p.points += award;
    }
  });
}

// 4. Checksum

const points = participants.map((p) => p.points).sort((a, b) => b - a);

let checksum = 0;

for (let i = 0; i < points.length;) {
  const score = points[i];
  const rank = i + 1;

  while (points[i] === score) {
    checksum += rank * score;
    i++;
  }
}

console.log(checksum);
