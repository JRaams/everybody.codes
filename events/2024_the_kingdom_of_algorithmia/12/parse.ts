export function parseDiagram(txt: string) {
  const targets: [y: number, x: number][] = [];

  const lines = txt.split("\n");

  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      const ny = lines.length - y - 2;
      const nx = x - 1;

      if (char === "T") {
        targets.push([ny, nx]);
      } else if (char === "H") {
        targets.push([ny, nx]);
        targets.push([ny, nx]);
      }
    });
  });

  return targets;
}
