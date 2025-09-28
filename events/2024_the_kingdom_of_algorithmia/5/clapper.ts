export class Clapper {
  private lines: number[][];
  private col: number;

  constructor(input: string) {
    this.lines = this.loadLines(input);
    this.col = 0;
  }

  private loadLines(input: string): number[][] {
    const lines: number[][] = [];

    input.split("\n").forEach((line) => {
      const x = line.split(" ").map(Number);
      for (let i = 0; i < 4; i++) {
        lines[i] ??= [];
        lines[i].push(x[i]);
      }
    });

    return lines;
  }

  public clap(): number {
    const claps = this.lines[this.col].shift()!;

    const newCol = this.lines[(this.col + 1) % 4];

    let moves = Math.abs((claps % (newCol.length * 2)) - 1);
    if (moves > newCol.length) {
      moves = newCol.length * 2 - moves;
    }
    newCol.splice(moves, 0, claps);

    this.col = (this.col + 1) % 4;

    return Number(this.lines.map((line) => line[0]).join(""));
  }

  public getHash(): string {
    let hash = this.col + "_";

    for (let i = 0; i < this.lines.length; i++) {
      hash += this.lines[i].join(",");
      hash += "_";
    }

    return hash;
  }
}
