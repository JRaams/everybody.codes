import { defaultDict } from "../../../util/defaultdict";
import { calculateRunicPower } from "./shrine";

const txt = await Bun.file("3.txt").text();

const grid = txt
  .trim()
  .split("\n")
  .map((line) => line.split(""));

console.log(solveGrid());

function solveGrid() {
  let corners: [y: number, x: number][] = [];

  for (let y = 0; y < grid.length - 2; y += 6) {
    for (let x = 0; x < grid[0].length - 2; x += 6) {
      corners.push([y, x]);
    }
  }

  let solvedCorners = -1;

  while (solvedCorners !== 0) {
    solvedCorners = 0;

    corners = corners.filter((c) => {
      if (solveCorner(c)) {
        solvedCorners++;
        return false;
      }
      return true;
    });
  }

  return calculateGridPower();
}

function solveCorner(corner: [y: number, x: number]): boolean {
  for (let y = 2; y < 6; y++) {
    for (let x = 2; x < 6; x++) {
      const [py, px] = [corner[0] + y, corner[1] + x];

      const symbolp = grid[py][px];
      if (symbolp.match(/[A-Z]/)) continue;

      const inColumn = new Set<string>();
      const inRow = new Set<string>();

      for (let i = 0; i < 8; i++) {
        const [cy, cx] = [corner[0] + i, px];
        const [ry, rx] = [py, corner[1] + i];

        if (grid[cy][cx].match(/[A-Z]/)) inColumn.add(grid[cy][cx]);
        if (grid[ry][rx].match(/[A-Z]/)) inRow.add(grid[ry][rx]);
      }

      const intersection = inColumn.intersection(inRow);

      if (intersection.size === 1) {
        const symbol = intersection.values().next().value!;
        grid[py][px] = symbol;
      }
    }
  }

  let isSolved = true;

  for (let y = 2; y < 6; y++) {
    for (let x = 2; x < 6; x++) {
      const [py, px] = [corner[0] + y, corner[1] + x];

      const symbolp = grid[py][px];
      if (symbolp.match(/[A-Z]/)) continue;

      isSolved = false;

      const occurrences = defaultDict(() => 0);
      let questionMark: [y: number, x: number] | undefined;

      for (let i = 0; i < 8; i++) {
        const [cy, cx] = [py, corner[1] + i];

        if (grid[cy][cx] === "?") {
          questionMark = [cy, cx];
        } else if (grid[cy][cx].match(/[A-Z]/)) {
          occurrences[grid[cy][cx]]++;
        }

        const [ry, rx] = [corner[0] + i, px];

        if (grid[ry][rx] === "?") {
          questionMark = [ry, rx];
        } else if (grid[ry][rx].match(/[A-Z]/)) {
          occurrences[grid[ry][rx]]++;
        }
      }

      const unique = Object.entries(occurrences).filter(
        ([_, count]) => count % 2 === 1
      );

      if (unique.length === 1) {
        const symbol = unique[0][0];
        grid[py][px] = symbol;
        if (questionMark) {
          grid[questionMark[0]][questionMark[1]] = symbol;
        }
      }
    }
  }

  return isSolved;
}

function calculateGridPower(): number {
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

  return result;
}
