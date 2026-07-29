import test from "node:test";
import assert from "node:assert/strict";
import generateSitemap from "../lib/sitemap.js";

test("generates tool URLs under the tools route", () => {
  const sitemap = generateSitemap(
    [{ id: "example-post", date: "2026-07-29" }],
    [{ id: "simple-replace", date: "2026-07-29" }]
  );

  assert.match(sitemap, /\/tools\/simple-replace/);
  assert.doesNotMatch(sitemap, /\/projects\/simple-replace/);
});
