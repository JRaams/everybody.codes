const input = await Bun.file("1.txt").text();

const plants = input
  .trim()
  .split("\n")
  .map((x) => x.matchAll(/\d+/g).toArray().map(Number));

let result = 0;

plants.forEach(([_id, growth, limit]) => {
  const branches = [1];

  let elements = 1;
  let seconds = 1;

  while (elements < limit) {
    seconds++;

    for (let i = branches.length - 1; i >= 0; i--) {
      branches[i]++;

      if (branches[i] >= growth) {
        const half = Math.floor(branches[i] / 2);
        branches.push(half);
        branches.push(1);
        branches[i] = half;
        elements += 2;
      } else {
        elements++;
      }
    }
  }

  result += seconds;
});

console.log(result);
