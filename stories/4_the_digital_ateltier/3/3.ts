import { Grid, parse } from "./grid";

const { width, height, horizontalOffsets, verticalOffsets } =
  await parse("3.txt");

const patternWidth = verticalOffsets.length * 2;
const patternHeight = horizontalOffsets.length * 2;

const grid = new Grid(patternWidth, patternHeight);

grid.markEdges(horizontalOffsets, verticalOffsets);

grid.markGroups();

const frequencyX = Math.floor(width / patternWidth);
const frequencyY = Math.floor(height / patternHeight);

const remainderX = width % patternWidth;
const remainderY = height % patternHeight;

function countGroups(height: number, width: number, frequency: number) {
  let green = 0;
  let yellow = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid.cells[y][x];
      if (!cell.isIsolated) continue;

      if (cell.group === "green") green++;
      else if (cell.group === "yellow") yellow++;
    }
  }

  green *= frequency;
  yellow *= frequency;

  return [green, yellow];
}

const [mainGreen, mainYellow] = countGroups(
  patternHeight,
  patternWidth,
  frequencyX * frequencyY,
);

const [rightGreen, rightYellow] = countGroups(
  patternHeight,
  remainderX,
  frequencyY,
);

const [diagonalGreen, diagonalYellow] = countGroups(remainderY, remainderX, 1);

const [bottomGreen, bottomYellow] = countGroups(
  remainderY,
  patternWidth,
  frequencyX,
);

const totalGreen = mainGreen + rightGreen + diagonalGreen + bottomGreen;
const totalYellow = mainYellow + rightYellow + diagonalYellow + bottomYellow;

const largestGroup = Math.max(totalGreen, totalYellow);

console.log(largestGroup);
