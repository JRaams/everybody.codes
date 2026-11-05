const input = await Bun.file("1.txt").text();

class Field {
  grid: number[][];
  shadows: boolean[][];

  constructor(input: string) {
    this.grid = input
      .trim()
      .split("\n")
      .map((x) => x.trim().replaceAll(".", "0").split("").map(Number));

    this.shadows = [];

    for (let y = 0; y < this.grid.length; y++) {
      const row: boolean[] = [];
      for (let x = 0; x < this.grid[0].length; x++) {
        row.push(false);
      }
      this.shadows.push(row);
    }
  }

  applyShadows(): void {
    this.shadows.forEach((s) => {
      for (let i = 0; i < s.length; i++) {
        s[i] = false;
      }
    });

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const h = this.grid[y][x];
        if (h === 0) continue;

        const [DY, DX] = [1, 1];

        for (let i = 1; i < h; i++) {
          const ny = y + DY * i;
          const nx = x + DX * i;

          const nh = this.grid[ny]?.[nx];

          if (nh === undefined) continue;

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
        if (h === 0) continue;

        if (!this.shadows[y][x]) {
          result++;
        }
      }
    }

    return result;
  }

  print(): void {
    for (let y = 0; y < this.grid.length; y++) {
      let line = "";

      for (let x = 0; x < this.grid[y].length; x++) {
        const h = this.grid[y][x].toString();
        const isShadow = this.shadows[y][x];

        if (h === "0") {
          line += " ";
        } else if (isShadow) {
          line += Bun.color("gray", "ansi") + h;
        } else {
          line += Bun.color("white", "ansi") + h;
        }
      }

      line += Bun.color("white", "ansi");

      console.log(line);
    }
  }
}

const field = new Field(input);

field.applyShadows();

field.print();

const energy = field.countEnergy();

console.log(energy);
