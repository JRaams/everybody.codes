import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { defaultDict } from "../../../util/defaultdict";

const input = await Bun.file("3.txt").text();

const plants = input
  .trim()
  .split("\n")
  .map((x) => x.matchAll(/\d+/g).toArray().map(Number));

let result = 0;

plants.forEach(([_id, growth, limit]) => {
  const times = new MinPriorityQueue<number>();
  const numBranches = defaultDict(Number);

  function add(time: number, amount: number) {
    if (numBranches[time] === 0) {
      times.enqueue(time);
    }
    numBranches[time] += amount;
  }

  add(growth, 1);

  let leaves = 1;
  let seconds = 1;

  while (leaves < limit) {
    const time = times.dequeue()!;
    const branches = numBranches[time];
    delete numBranches[time];

    add(time + Math.floor(growth / 2) + 1, branches * 2);
    add(time + growth - 1, branches);

    leaves += branches;
    seconds = time;
  }

  result += seconds;
});

console.log(result);
