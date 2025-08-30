export class Dice {
  private faces: number[];
  private seed: number;
  private pulse: number;
  private roll_number: number;
  private spin: number;

  constructor(faces: number[], seed: number) {
    this.faces = faces;
    this.seed = seed;
    this.pulse = seed;
    this.roll_number = 1;
    this.spin = 0;
  }

  roll(): number {
    const nextSpin = this.roll_number * this.pulse;

    this.spin += nextSpin;

    const result = this.faces[this.spin % this.faces.length];

    this.pulse += nextSpin;

    this.pulse %= this.seed;

    this.pulse += 1 + this.roll_number + this.seed;

    this.roll_number++;

    return result;
  }

  static fromInput(input: string): Dice {
    input = input.split("=[")[1];

    const [facesRaw, seed] = input.split("] seed=");

    const faces = facesRaw.split(",").map(Number);

    return new Dice(faces, Number(seed));
  }
}
