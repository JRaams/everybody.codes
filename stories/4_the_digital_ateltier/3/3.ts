import { Grid, parse } from "./grid";

const { width, height, horizontalOffsets, verticalOffsets } =
  await parse("3.txt");

const grid = new Grid(verticalOffsets.length * 2, horizontalOffsets.length * 2);

grid.markEdges(horizontalOffsets, verticalOffsets);

grid.markGroups();

grid.print();

let green = 0;
let yellow = 0;

for (let y = 0; y < grid.cells.length; y++) {
  for (let x = 0; x < grid.cells[0].length; x++) {
    const cell = grid.cells[y][x];
    if (!cell.isIsolated) continue;

    if (cell.group === "green") green++;
    else if (cell.group === "yellow") yellow++;
  }
}

const repeatsHorizontal = Math.floor(width / (verticalOffsets.length * 2));
const repeatsVertical = Math.floor(height / (horizontalOffsets.length * 2));

const mainGreen = green * repeatsHorizontal * repeatsVertical;
const mainYellow = yellow * repeatsHorizontal * repeatsVertical;

const remainderHorizontal = width % (verticalOffsets.length * 2);
const remainderVertical = height % (horizontalOffsets.length * 2);

console.log({
  green,
  yellow,
  mainGreen,
  mainYellow,
  width,
  height,
  repeatsHorizontal,
  repeatsVertical,
  remainderHorizontal,
  remainderVertical,
});

// right

let rightGreen = 0;
let rightYellow = 0;

for (let y = 0; y < horizontalOffsets.length * 2; y++) {
  for (let x = 0; x < remainderHorizontal; x++) {
    const cell = grid.cells[y]?.[x];
    if (!cell?.isIsolated) continue;

    if (cell.group === "green") rightGreen++;
    else if (cell.group === "yellow") rightYellow++;
  }
}

rightGreen *= repeatsVertical;
rightYellow *= repeatsVertical;

// diagonal

let diagonalGreen = 0;
let diagonalYellow = 0;

for (let y = 0; y < remainderVertical; y++) {
  for (let x = 0; x < remainderHorizontal; x++) {
    const cell = grid.cells[y]?.[x];
    if (!cell?.isIsolated) continue;

    if (cell.group === "green") diagonalGreen++;
    else if (cell.group === "yellow") diagonalYellow++;
  }
}

// bottom

let bottomGreen = 0;
let bottomYellow = 0;

for (let y = 0; y < remainderVertical; y++) {
  for (let x = 0; x < verticalOffsets.length * 2; x++) {
    const cell = grid.cells[y]?.[x];
    if (!cell?.isIsolated) continue;

    if (cell.group === "green") bottomGreen++;
    else if (cell.group === "yellow") bottomYellow++;
  }
}

bottomGreen *= repeatsHorizontal;
bottomYellow *= repeatsHorizontal;

const totalGreen = mainGreen + rightGreen + diagonalGreen + bottomGreen;
const totalYellow = mainYellow + rightYellow + diagonalYellow + bottomYellow;

console.log({
  rightGreen,
  rightYellow,
  diagonalGreen,
  diagonalYellow,
  bottomGreen,
  bottomYellow,
  totalGreen,
  totalYellow,
});

console.log(Math.max(totalGreen, totalYellow));
