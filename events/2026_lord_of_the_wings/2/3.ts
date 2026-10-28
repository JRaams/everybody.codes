const lines = await Bun.file("3.txt").text();

const input = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(" "));

let result = 0;

input.forEach((group) => {
  const comparers: [number, number][] = [];
  let max = 0;

  group.forEach((comparison) => {
    let [a, b] = [0, 0];

    if (comparison.includes("<")) {
      [a, b] = comparison.split("<").map(Number);
    } else {
      [b, a] = comparison.split(">").map(Number);
    }

    comparers.push([a, b]);
    max = Math.max(max, a, b);
  });

  let list: number[] = [];
  for (let i = 1; i <= max; i++) {
    list.push(i);
  }

  let hadChange = true;

  while (hadChange) {
    hadChange = false;

    comparers.forEach(([a, b]) => {
      const ia = list.indexOf(a);
      const ib = list.indexOf(b);

      if (ia < ib) {
        list[ia] = b;
        list[ib] = a;
        hadChange = true;
      }
    });
  }

  result += Number(list.join(""));
});

console.log(result);
