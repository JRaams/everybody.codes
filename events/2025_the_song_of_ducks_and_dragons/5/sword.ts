export class Sword {
  id: number;
  segments: Segment[];
  quality: number;

  constructor(line: string) {
    const [id, sequenceRaw] = line.split(":");
    this.id = Number(id);
    this.segments = [];

    const sequence = sequenceRaw.split(",").map(Number);

    nextNumber: for (const number of sequence) {
      for (const segment of this.segments) {
        if (segment[0] === undefined && number < segment[1]) {
          segment[0] = number;
          continue nextNumber;
        } else if (segment[2] === undefined && number > segment[1]) {
          segment[2] = number;
          continue nextNumber;
        }
      }

      this.segments.push([undefined, number, undefined]);
    }

    this.quality = Number(this.segments.map((x) => x[1]).join(""));
  }
}

type Segment = [
  left: number | undefined,
  spine: number,
  right: number | undefined
];
