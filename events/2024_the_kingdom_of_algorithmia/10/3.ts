import { calculateRunicPower } from "./shrine";

const txt = await Bun.file("3.txt").text();

const grid = txt
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let corners: [y: number, x: number][] = [];

for (let y = 0; y < grid.length - 2; y += 6) {
  for (let x = 0; x < grid[0].length - 2; x += 6) {
    corners.push([y, x]);
  }
}

const logs: string[] = [];

let hasChange = true;

while (hasChange) {
  hasChange = false;

  const nextCorners: [y: number, x: number][] = [];

  corners.forEach((c) => {
    if (solveCorner(c)) {
      hasChange = true;
    } else {
      nextCorners.push(c);
    }
  });

  corners = nextCorners;
}

let result = 0;

for (let cy = 0; cy < grid.length - 2; cy += 6) {
  for (let cx = 0; cx < grid[0].length - 2; cx += 6) {
    let rune = "";

    for (let y = 2; y < 6; y++) {
      for (let x = 2; x < 6; x++) {
        const symbol = grid[cy + y][cx + x];
        rune += symbol;
      }
    }

    if (rune.includes(".")) {
      continue;
    }

    result += calculateRunicPower(rune);
  }
}

// console.log(grid.map((row) => row.join("")).join("\n"));
console.log(result);

await Bun.write("test", logs.join("\n"));

function solveCorner(corner: [y: number, x: number]): boolean {
  for (let y = 2; y < 6; y++) {
    for (let x = 2; x < 6; x++) {
      const inColumn = new Set<string>();
      const inRow = new Set<string>();

      for (let i = 0; i < 8; i++) {
        const [cy, cx] = [corner[0] + i, corner[1] + x];
        const [ry, rx] = [corner[0] + y, corner[1] + i];

        if (grid[cy][cx].match(/[A-Z]/)) inColumn.add(grid[cy][cx]);
        if (grid[ry][rx].match(/[A-Z]/)) inRow.add(grid[ry][rx]);
      }

      const intersection = inColumn.intersection(inRow);

      if (intersection.size === 1) {
        const symbol = intersection.values().next().value!;
        const [py, px] = [corner[0] + y, corner[1] + x];
        grid[py][px] = symbol;
        logs.push(`s ${py},${px} ${symbol.charCodeAt(0)}`);
      }
    }
  }

  let isSolved = true;

  for (let y = 2; y < 6; y++) {
    for (let x = 2; x < 6; x++) {
      const [py, px] = [corner[0] + y, corner[1] + x];

      const symbolp = grid[py][px];
      if (symbolp.match(/[A-Z]/)) {
        continue;
      }

      isSolved = false;

      const occurrences = new Map<string, number>();
      let questionMark: [y: number, x: number] | undefined;

      for (let i = 0; i < 8; i++) {
        const [cy, cx] = [corner[0] + y, corner[1] + i];

        if (grid[cy][cx] === "?") {
          questionMark = [cy, cx];
        } else if (grid[cy][cx].match(/[A-Z]/)) {
          occurrences.set(
            grid[cy][cx],
            (occurrences.get(grid[cy][cx]) ?? 0) + 1
          );
        }

        const [ry, rx] = [corner[0] + i, corner[1] + x];

        if (grid[ry][rx] === "?") {
          questionMark = [ry, rx];
        } else if (grid[ry][rx].match(/[A-Z]/)) {
          occurrences.set(
            grid[ry][rx],
            (occurrences.get(grid[ry][rx]) ?? 0) + 1
          );
        }

        if (corner[0] == 6 && corner[1] == 12 && py == 8 && px == 17) {
          console.log(
            i,
            grid[cy][cx].charCodeAt(0),
            grid[ry][rx].charCodeAt(0)
          );
        }
      }

      const unique = Array.from(occurrences.entries()).filter(
        ([_, count]) => count % 2 === 1
      );

      if (unique.length === 1) {
        const symbol = unique[0][0];
        grid[py][px] = symbol;
        if (questionMark) {
          grid[questionMark[0]][questionMark[1]] = symbol;
        }
        logs.push(
          `q (${corner[0]},${corner[1]}) ${py},${px} ${symbol.charCodeAt(0)} ${
            questionMark?.[0]
          },${questionMark?.[1]}`
        );
      }
    }
  }

  return isSolved;
}
