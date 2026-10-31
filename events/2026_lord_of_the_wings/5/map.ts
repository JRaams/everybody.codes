export class Land {
  grid: string[][];
  middleY: number;
  middleX: number;

  constructor(grid: string[][], middleY: number, middleX: number) {
    this.grid = grid;
    this.middleY = middleY;
    this.middleX = middleX;
  }

  public static async load(filename: string): Promise<Land> {
    const lines = await Bun.file(filename).text();

    const grid = lines
      .trim()
      .split("\n")
      .map((x) => x.trim().split(""));

    const middleY = Math.floor(grid.length / 2);
    const middleX = Math.floor(grid[0].length / 2);

    grid[middleY][middleX] = "#";

    return new Land(grid, middleY, middleX);
  }

  public reconstructLand(): void {
    const queue = new Set<string>();
    queue.add(this.middleY + "-" + this.middleX);

    while (true) {
      const neighbours: [number, number][] = [];

      const toChange: [number, number][] = [];

      queue.forEach((entry) => {
        const [y, x] = entry.split("-").map(Number);

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;

            if (this.grid[ny]?.[nx] && this.grid[ny][nx] !== "#") {
              neighbours.push([ny, nx]);
            }
          }
        }
      });

      queue.clear();

      for (const [y, x] of neighbours) {
        let land = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue;

            const c = this.grid[y + dy]?.[x + dx];
            if (c === "#" || c === "1") {
              land++;
            }
          }
        }

        if (land >= 5) {
          queue.add(y + "-" + x);
          toChange.push([y, x]);
        }
      }

      if (toChange.length === 0) {
        break;
      }

      for (const [y, x] of toChange) {
        this.grid[y][x] = "#";
      }
    }
  }

  public determineCoastline(): Set<string> {
    const coast = new Set<string>();

    for (let y = 0; y < this.grid.length; y++) {
      nextCell: for (let x = 0; x < this.grid[0].length; x++) {
        if (this.grid[y][x] !== "#") continue;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;

            if (this.grid[ny]?.[nx] !== "#") {
              coast.add(y + "-" + x);
              continue nextCell;
            }
          }
        }
      }
    }

    for (const entry of coast) {
      const [y, x] = entry.split("-").map(Number);
      this.grid[y][x] = "=";
    }

    return coast;
  }

  public markRemainingSand(queue: Set<string>): void {
    while (true) {
      const neighbours: [number, number][] = [];

      const toChange: [number, number][] = [];

      queue.forEach((entry) => {
        const [y, x] = entry.split("-").map(Number);

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;

            if (this.grid[ny]?.[nx] && this.grid[ny][nx] === "#") {
              neighbours.push([ny, nx]);
            }
          }
        }
      });

      queue.clear();

      for (const [y, x] of neighbours) {
        let sand = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue;

            const c = this.grid[y + dy]?.[x + dx];
            if (c === "=") {
              sand++;
            }
          }
        }

        if (sand >= 5) {
          queue.add(y + "-" + x);
          toChange.push([y, x]);
        }
      }

      if (toChange.length === 0) {
        break;
      }

      for (const [y, x] of toChange) {
        this.grid[y][x] = "=";
      }
    }
  }

  public decorateWithTrees(): void {
    const treePattern = [
      [-2, -1],
      [-2, 0],
      [-2, 1],

      [-1, -2],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [-1, 2],

      [0, -2],
      [0, -1],
      [0, 1],
      [0, 2],

      [1, -2],
      [1, -1],
      [1, 0],
      [1, 1],
      [1, 2],

      [2, -1],
      [2, 0],
      [2, 1],
    ];

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        if (this.grid[y][x] !== "#") continue;

        const canPlant = treePattern.every(([dy, dx]) => {
          const [ny, nx] = [y + dy, x + dx];
          const c = this.grid[ny]?.[nx];
          return c === "#" || c === "@";
        });

        if (canPlant) {
          this.grid[y][x] = "@";
        }
      }
    }
  }

  public growForest(): void {
    const toChange: [number, number][] = [];

    for (let y = 0; y < this.grid.length; y++) {
      nextCell: for (let x = 0; x < this.grid[0].length; x++) {
        if (this.grid[y][x] !== "#") continue;

        let trees = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue;

            const c = this.grid[y + dy]?.[x + dx];

            if (c === "=") {
              continue nextCell;
            } else if (c === "@") {
              trees++;
            }
          }
        }

        if (trees >= 4) {
          toChange.push([y, x]);
        }
      }
    }

    for (const [y, x] of toChange) {
      this.grid[y][x] = "@";
    }
  }

  public numCellsOfType(cellType: string): number {
    let result = 0;

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        if (this.grid[y][x] === cellType) {
          result++;
        }
      }
    }

    return result;
  }

  public print(): void {
    for (let y = 0; y < this.grid.length; y++) {
      let line = "";

      for (let x = 0; x < this.grid[0].length; x++) {
        const c = this.grid[y][x];

        if (c === "#") {
          line += Bun.color("#00db43", "ansi") + "#";
        } else if (c === "=") {
          line += Bun.color("#ecd90b", "ansi") + "=";
        } else if (c === "@") {
          line += Bun.color("#007a26", "ansi") + "@";
        } else {
          line += Bun.color("#00b3db", "ansi") + ".";
        }
      }

      line += Bun.color("white", "ansi");

      console.log(line);
    }
  }
}
