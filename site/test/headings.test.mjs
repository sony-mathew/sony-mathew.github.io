import test from "node:test";
import assert from "node:assert/strict";
import { extractHeadings, slugifyHeading } from "../lib/headings.js";

test("extracts and numbers a nested table of contents", () => {
  const headings = extractHeadings(`
## First section
### First detail
### Second detail
## Second section
`);

  assert.deepEqual(
    headings.map(({ depth, number, text }) => ({ depth, number, text })),
    [
      { depth: 0, number: "1", text: "First section" },
      { depth: 1, number: "1.1", text: "First detail" },
      { depth: 1, number: "1.2", text: "Second detail" },
      { depth: 0, number: "2", text: "Second section" },
    ]
  );
});

test("ignores headings inside fenced code blocks", () => {
  const headings = extractHeadings(`
# Visible
\`\`\`md
# Hidden
\`\`\`
## Also visible
`);

  assert.deepEqual(headings.map(({ text }) => text), ["Visible", "Also visible"]);
});

test("creates unique, unicode-friendly heading links", () => {
  const headings = extractHeadings(`
# അർമേനിയയിൽ കാലുകുത്തൽ
# Repeat
# Repeat
`);

  assert.equal(slugifyHeading("Hello, World!"), "hello-world");
  assert.equal(headings[0].id, "അർമേനിയയിൽ-കാലുകുത്തൽ");
  assert.equal(headings[1].id, "repeat");
  assert.equal(headings[2].id, "repeat-2");
});
