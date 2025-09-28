import { Clapper } from "./clapper";
import { describe, it, expect } from "bun:test";

describe("Clapper", () => {
  it("should complete part 1 example", () => {
    const clapper = new Clapper(`2 3 4 5\n3 4 5 2\n4 5 2 3\n5 2 3 4`);
    expect(clapper.clap()).toBe(3345);
    expect(clapper.clap()).toBe(3245);
    expect(clapper.clap()).toBe(3255);
    expect(clapper.clap()).toBe(3252);
    expect(clapper.clap()).toBe(4252);
    expect(clapper.clap()).toBe(4452);
    expect(clapper.clap()).toBe(4422);
    expect(clapper.clap()).toBe(4423);
    expect(clapper.clap()).toBe(2423);
    expect(clapper.clap()).toBe(2323);
  });

  it("should complete part 2 example", () => {
    const clapper = new Clapper(`2 3 4 5\n6 7 8 9`);
    expect(clapper.clap()).toBe(6345);
    expect(clapper.clap()).toBe(6245);
    expect(clapper.clap()).toBe(6285);
    expect(clapper.clap()).toBe(5284);
    expect(clapper.clap()).toBe(6584);
    expect(clapper.clap()).toBe(6254);
    expect(clapper.clap()).toBe(6285);
    expect(clapper.clap()).toBe(5284);
    expect(clapper.clap()).toBe(6584);
    expect(clapper.clap()).toBe(6254);
  });
});
