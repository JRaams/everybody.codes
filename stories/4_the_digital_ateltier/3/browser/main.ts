import { Grid } from "../grid";

window.addEventListener("load", () => {
  const $inputBtn = document.querySelector(
    "#load-input-btn",
  ) as HTMLButtonElement;
  if (!$inputBtn) throw new Error("Could not find load input btn");

  const $cellSizeInput = document.querySelector(
    "#cell-size-input",
  ) as HTMLInputElement;
  if (!$cellSizeInput) throw new Error("Could not find cell size input");

  const $cellSizeLabel = document.querySelector(
    "#cell-size-label",
  ) as HTMLSpanElement;
  if (!$cellSizeLabel) throw new Error("Could not find cell size label");

  const $input = document.querySelector("textarea") as HTMLTextAreaElement;
  if (!$input) throw new Error("Could not find textarea");

  const $exportBtn = document.querySelector("#export-btn") as HTMLButtonElement;
  if (!$exportBtn) throw new Error("Could not find export btn");

  $inputBtn.addEventListener("click", () => {
    const { horizontalOffsets, verticalOffsets } = parseInput($input.value);

    const grid = buildGrid(verticalOffsets, horizontalOffsets);

    const cellSizePx = Number($cellSizeInput.value);

    const $svg = buildSvg(grid, cellSizePx);

    document.querySelector(".svg-wrapper")?.remove();

    document.body.appendChild($svg);

    $exportBtn.style.display = "inline";
  });

  $cellSizeInput.addEventListener("change", (e) => {
    const newValue = (e.target as HTMLInputElement).value;
    $cellSizeLabel.textContent = "Cell size: " + newValue;
  });

  $exportBtn.addEventListener("click", () => {
    console.log("export");

    const svgElement = document.querySelector("svg");
    if (!svgElement) throw new Error("Could not find svg");

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
      if (!ctx) throw new Error("Canvas context discarded");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement("a");
      link.download = "converted.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  });
});

function parseInput(input: string) {
  const [_widthStr, _heightStr, horizontalOffsetsStr, verticalOffsetsStr] =
    input.matchAll(/\d+/g)!.map(String);

  const horizontalOffsets = horizontalOffsetsStr.split("").map(Number);
  const verticalOffsets = verticalOffsetsStr.split("").map(Number);

  return { horizontalOffsets, verticalOffsets };
}

function buildGrid(verticalOffsets: number[], horizontalOffsets: number[]) {
  const patternWidth = verticalOffsets.length * 2;
  const patternHeight = horizontalOffsets.length * 2;

  const grid = new Grid(patternWidth, patternHeight);

  grid.markEdges(horizontalOffsets, verticalOffsets);

  grid.markGroups();

  return grid;
}

function buildSvg(grid: Grid, cellSizePx: number): HTMLElement {
  const height = grid.cells.length;
  const width = grid.cells[0].length;
  const heightPx = height * cellSizePx;
  const widthPx = width * cellSizePx;

  const $svgContainer = document.createElement("div");
  $svgContainer.classList.add("svg-wrapper");

  const ns = "http://www.w3.org/2000/svg";

  const $svg = document.createElementNS(ns, "svg");
  $svg.setAttribute("height", heightPx.toString());
  $svg.setAttribute("width", widthPx.toString());
  $svg.setAttribute("viewbox", `0 0 ${heightPx} ${widthPx}`);
  $svg.style.border = "1px solid gray";

  for (let y = 0; y < grid.cells.length; y++) {
    for (let x = 0; x < grid.cells[0].length; x++) {
      const cell = grid.cells[y][x];

      const $rect = document.createElementNS(ns, "rect");
      $rect.setAttribute("width", cellSizePx + "");
      $rect.setAttribute("height", cellSizePx + "");
      $rect.setAttribute("x", x * cellSizePx + "");
      $rect.setAttribute("y", y * cellSizePx + "");

      if (cell.group === "green") {
        $rect.setAttribute("fill", "green");
        if (cell.isIsolated) {
          $rect.setAttribute("stroke", "lightgreen");
          $rect.setAttribute("stroke-width", "1");
        }
      } else {
        $rect.setAttribute("fill", "yellow");
        if (cell.isIsolated) {
          $rect.setAttribute("stroke", "orange");
          $rect.setAttribute("stroke-width", "1");
        }
      }

      if (!cell.isIsolated) {
        $rect.setAttribute("fill-opacity", "0.2");
      }

      $svg.appendChild($rect);
    }
  }

  $svgContainer.appendChild($svg);

  return $svgContainer;
}
