const input = await Bun.file("3.txt").text();

class Field {
  grid: (number | null)[][];
  shadows: boolean[][];

  constructor(input: string) {
    this.grid = [];
    this.shadows = [];

    const lines = input.trim().split("\n");

    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      const row: (number | null)[] = [];
      const shadowRow: boolean[] = [];

      for (let x = 0; x < line.length; x++) {
        const c = line[x];
        if (c === ".") {
          row.push(null);
        } else {
          row.push(Number(c));
        }
        shadowRow.push(false);
      }

      this.grid.push(row);
      this.shadows.push(shadowRow);
    }
  }

  applyShadows(DY: number, DX: number): void {
    this.shadows.forEach((s) => {
      for (let i = 0; i < s.length; i++) {
        s[i] = false;
      }
    });

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const h = this.grid[y][x];
        if (h === null) continue;

        for (let i = 1; i < h; i++) {
          const ny = y + DY * i;
          const nx = x + DX * i;

          const nh = this.grid[ny]?.[nx];

          if (nh === undefined || nh === null || nh <= 0) continue;

          if (h - i + 1 > nh) {
            this.shadows[ny][nx] = true;
          }
        }
      }
    }
  }

  countEnergy(): number {
    let result = 0;

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const h = this.grid[y][x];
        if (h === null) continue;

        if (!this.shadows[y][x]) {
          result++;
        }
      }
    }

    return result;
  }

  growWarriors(): [number, number] {
    let inLight: [number, number][] = [];

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const h = this.grid[y][x];
        if (h === null || h <= 0) continue;

        if (!this.shadows[y][x]) {
          inLight.push([y, x]);
        }
      }
    }

    let newWarriors = 0;

    for (const [y, x] of inLight) {
      const h = this.grid[y][x];
      if (h === null) continue;
      if (h < 1) continue;

      if (h === 9) {
        newWarriors++;
        this.grid[y][x] = -3;
      } else {
        this.grid[y][x]! += 1;
      }
    }

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const h = this.grid[y][x];
        if (h === null || h >= 1) continue;

        this.grid[y][x]! += 1;
      }
    }

    return [inLight.length, newWarriors];
  }

  print(): void {
    for (let y = 0; y < this.grid.length; y++) {
      let line = "";

      for (let x = 0; x < this.grid[y].length; x++) {
        const h = this.grid[y][x];
        const isShadow = this.shadows[y][x];

        if (h === null) {
          line += " ";
        } else if (h < 1) {
          line += Bun.color("cyan", "ansi") + Math.abs(h).toString();
        } else if (isShadow) {
          line += Bun.color("gray", "ansi") + h.toString();
        } else {
          line += Bun.color("white", "ansi") + h.toString();
        }
      }

      line += Bun.color("white", "ansi");

      console.log(line);
    }
  }
}

const field = new Field(input);

const DIRS = [
  [1, 1],
  [1, -1],
  [0, -2],
  [-1, -1],
  [-1, 1],
  [0, 2],
];

let currentDir = 0;
let totalEnergy = 0;
let totalWarriors = 0;

while (totalWarriors < 100000) {
  const [DY, DX] = DIRS[currentDir++ % DIRS.length];

  field.applyShadows(DY, DX);

  const [energy, newWarriors] = field.growWarriors();
  totalEnergy += energy;
  totalWarriors += newWarriors;
}

console.log(totalEnergy);
