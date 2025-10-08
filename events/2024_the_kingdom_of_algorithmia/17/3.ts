import {
  calculateConstellationSize,
  manhattan,
  parse,
  type Star,
} from "./stars";

const txt = await Bun.file("3.txt").text();
const stars = parse(txt);

const constellations: Star[][] = [];

let star = stars.shift();

while (star) {
  const constellation: Star[] = [star];

  for (const current of constellation) {
    for (let j = stars.length - 1; j >= 0; j--) {
      const other = stars[j];

      if (manhattan(current, other) < 6) {
        constellation.push(other);
        stars.splice(j, 1);
      }
    }
  }

  star = stars.shift();
  constellations.push(constellation);
}

const sizes = constellations.map((x) => calculateConstellationSize(x));
sizes.sort((a, b) => b - a);

console.log(sizes[0] * sizes[1] * sizes[2]);
