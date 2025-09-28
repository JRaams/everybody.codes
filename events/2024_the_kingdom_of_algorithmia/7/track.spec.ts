import { loadTrack } from "./track";
import { describe, it, expect } from "bun:test";

describe("loadTrack", () => {
  it("should load the part 2 example 1 track", () => {
    const track = loadTrack(
      `S+===
-   +
=+=-+`
    );

    expect(track).toEqual("+===++-=+=-S");
  });

  it("should load the part 2 example 2 track", () => {
    const track = loadTrack(
      `S-=++=-==++=++=-=+=-=+=+=--=-=++=-==++=-+=-=+=-=+=+=++=-+==++=++=-=-=--
-                                                                     -
=                                                                     =
+                                                                     +
=                                                                     +
+                                                                     =
=                                                                     =
-                                                                     -
--==++++==+=+++-=+=-=+=-+-=+-=+-=+=-=+=--=+++=++=+++==++==--=+=++==+++-`
    );

    expect(track).toEqual(
      "-=++=-==++=++=-=+=-=+=+=--=-=++=-==++=-+=-=+=-=+=+=++=-+==++=++=-=-=---=++==--+++==++=+=--==++==+++=++=+++=--=+=-=+=-+=-+=-+-=+=-=+=-+++=+==++++==---=+=+=-S"
    );
  });
});
