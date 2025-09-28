const input = await Bun.file("1.txt").text();

const segmentsAndResult: [string, number][] = [];

input.split("\n").forEach((line) => {
  const [segment, actionsRaw] = line.split(":");

  const actions = actionsRaw.split(",");

  let result = 0;
  let actionIndex = 0;
  let power = 10;

  for (let i = 0; i < 10; i++) {
    const action = actions[actionIndex];

    if (action === "+") {
      power++;
    } else if (action === "-") {
      power--;
    }

    result += power;

    actionIndex = (actionIndex + 1) % actions.length;
  }

  segmentsAndResult.push([segment, result]);
});

segmentsAndResult.sort((a, b) => b[1] - a[1]);

const ranking = segmentsAndResult.map((s) => s[0]);
console.log(ranking.join(""));
