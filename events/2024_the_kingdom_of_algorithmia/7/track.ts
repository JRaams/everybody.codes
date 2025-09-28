export function loadTrack(input: string): string {
  const track = input.split("\n").map((line) => line.split(""));

  const seen = new Set<string>();
  seen.add("0_0");

  const queue: [y: number, x: number][] = [[0, 1]];
  let result = "";

  while (queue.length > 0) {
    const [y, x] = queue.shift()!;

    const current = track[y]?.[x];
    if (current === undefined || current === " ") continue;

    const key = `${y}_${x}`;
    if (seen.has(key)) continue;
    seen.add(key);

    result += current;

    for (const [dy, dx] of DIRS) {
      queue.push([y + dy, x + dx]);
    }
  }

  result += "S";

  return result;
}

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export function simulate(
  track: string,
  actions: string[],
  loops: number
): number {
  let result = 0;
  let actionIndex = 0;
  let power = 10;

  for (let loop = 0; loop < loops; loop++) {
    for (let i = 0; i < track.length; i++) {
      let action = actions[actionIndex];

      const trackAction = track[i];

      if (trackAction === "+") {
        action = "+";
      } else if (trackAction === "-") {
        action = "-";
      }

      if (action === "+") {
        power++;
      } else if (action === "-") {
        if (power > 0) {
          power--;
        }
      }

      result += power;

      actionIndex = (actionIndex + 1) % actions.length;
    }
  }

  return result;
}
