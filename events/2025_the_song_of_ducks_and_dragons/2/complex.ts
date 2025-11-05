export class Complex {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Complex): Complex {
    return new Complex(this.x + other.x, this.y + other.y);
  }

  mul(other: Complex): Complex {
    return new Complex(
      this.x * other.x - this.y * other.y,
      this.x * other.y + this.y * other.x
    );
  }

  div(other: Complex): Complex {
    return new Complex(~~(this.x / other.x), ~~(this.y / other.y));
  }

  toString(): string {
    return `[${this.x},${this.y}]`;
  }
}
