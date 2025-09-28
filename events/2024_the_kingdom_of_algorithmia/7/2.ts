import { loadTrack, simulate } from "./track";

const input = await Bun.file("2.txt").text();

const segmentsAndResult: [string, number][] = [];
const track =
  loadTrack(`S-=++=-==++=++=-=+=-=+=+=--=-=++=-==++=-+=-=+=-=+=+=++=-+==++=++=-=-=--
-                                                                     -
=                                                                     =
+                                                                     +
=                                                                     +
+                                                                     =
=                                                                     =
-                                                                     -
--==++++==+=+++-=+=-=+=-+-=+-=+-=+=-=+=--=+++=++=+++==++==--=+=++==+++-`);

input.split("\n").forEach((line) => {
  const [segment, actions] = line.split(":");

  const actionsArray = actions.split(",");

  const result = simulate(track, actionsArray, 10);

  segmentsAndResult.push([segment, result]);
});

segmentsAndResult.sort((a, b) => b[1] - a[1]);

const ranking = segmentsAndResult.map((s) => s[0]).join("");

console.log(ranking);
