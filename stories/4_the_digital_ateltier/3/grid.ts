export async function parse(fileName: string) {
  const input = await Bun.file(fileName).text();

  const [widthStr, heightStr, horizontalOffsetsStr, verticalOffsetsStr] = input
    .matchAll(/\d+/g)!
    .map(String);

  const width = Number(widthStr);
  const height = Number(heightStr);
  const horizontalOffsets = horizontalOffsetsStr.split("").map(Number);
  const verticalOffsets = verticalOffsetsStr.split("").map(Number);

  return { width, height, horizontalOffsets, verticalOffsets };
}

export class Cell {
  x: number;
  y: number;
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  isIsolated: boolean;
  group: "green" | "yellow" | null;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.top = false;
    this.right = false;
    this.bottom = false;
    this.left = false;
    this.isIsolated = false;
    this.group = null;
  }

  mark(side: "top" | "right" | "bottom" | "left"): void {
    switch (side) {
      case "top": {
        this.top = true;
        break;
      }
      case "right": {
        this.right = true;
        break;
      }
      case "bottom": {
        this.bottom = true;
        break;
      }
      case "left": {
        this.left = true;
        break;
      }
    }

    if (this.top && this.right && this.bottom && this.left) {
      this.isIsolated = true;
    }
  }

  print(): string {
    let amount = 0;
    if (this.top) amount++;
    if (this.right) amount++;
    if (this.bottom) amount++;
    if (this.left) amount++;

    if (amount === 4) {
      if (this.group === "green") {
        return "G";
      } else if (this.group === "yellow") {
        return "Y";
      } else {
        return "N";
      }
    }
    return ".";
  }
}

export class Grid {
  cells: Cell[][];

  constructor(width: number, height: number) {
    this.cells = [];

    for (let y = 0; y < height; y++) {
      const row: Cell[] = [];

      for (let x = 0; x < width; x++) {
        row.push(new Cell(x, y));
      }

      this.cells.push(row);
    }
  }

  markEdges(hOff: number[], vOff: number[]): void {
    const height = this.cells.length;
    const width = this.cells[0].length;

    for (let y = 0; y < height + 1; y++) {
      const startX = hOff[y % hOff.length];

      for (let x = startX; x < width; x += 2) {
        this.cells[y]?.[x]?.mark("top");
        this.cells[y - 1]?.[x]?.mark("bottom");
      }
    }

    for (let x = 0; x < width + 1; x++) {
      const startY = vOff[x % vOff.length];

      for (let y = startY; y < height; y += 2) {
        this.cells[y]?.[x]?.mark("left");
        this.cells[y]?.[x - 1]?.mark("right");
      }
    }
  }

  markGroups(): void {
    const height = this.cells.length;
    const width = this.cells[0].length;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const current = this.cells[y][x];

        if (current.group !== null) continue;

        const groupColor = this.colorForCell(x, y);

        const queue: Cell[] = [current];

        while (queue.length > 0) {
          const cell = queue.shift()!;

          if (cell.group !== null) continue;

          cell.group = groupColor;

          if (!cell.top && cell.y > 0) {
            queue.push(this.cells[cell.y - 1]?.[cell.x]);
          }
          if (!cell.bottom && cell.y < height - 1) {
            queue.push(this.cells[cell.y + 1]?.[cell.x]);
          }
          if (!cell.left && cell.x > 0) {
            queue.push(this.cells[cell.y][cell.x - 1]);
          }
          if (!cell.right && cell.x < width - 1) {
            queue.push(this.cells[cell.y][cell.x + 1]);
          }
        }
      }
    }
  }

  print(): void {
    for (let y = 0; y < this.cells.length; y++) {
      let line = "";
      for (let x = 0; x < this.cells[y].length; x++) {
        line += this.cells[y][x].print();
      }
      console.log(line);
    }
  }

  colorForCell(x: number, y: number): "green" | "yellow" {
    const top = this.cells[y - 1]?.[x];
    const right = this.cells[y][x + 1];
    const bottom = this.cells[y + 1]?.[x];
    const left = this.cells[y][x - 1];

    if (top?.group === "green") return "yellow";
    if (right?.group === "green") return "yellow";
    if (bottom?.group === "green") return "yellow";
    if (left?.group === "green") return "yellow";

    return "green";
  }
}
