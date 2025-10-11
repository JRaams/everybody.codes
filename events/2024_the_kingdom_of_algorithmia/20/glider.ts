export function parse(txt: string) {
  const grid = txt.split("\n").map((x) => x.split(""));

  let checkpoints = new Map<string, [number, number]>();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const symbol = grid[y][x];
      if (symbol.match(/[A-Z]/)) {
        checkpoints.set(symbol, [x, y]);
      }
    }
  }

  return {
    grid,
    checkpoints,
  };
}

export type State = {
  x: number;
  y: number;
  alt: number;
  dir: "up" | "down" | "left" | "right";
  time: number;
};

export function altChange(symbol: string) {
  if (symbol === "-") return -2;
  if (symbol === "+") return 1;
  return -1;
}

export const NextDirs = {
  up: ["left", "up", "right"],
  down: ["left", "down", "right"],
  left: ["up", "left", "down"],
  right: ["up", "right", "down"],
} as const;

export const Directions = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
} as const;
