import test from "node:test";
import assert from "node:assert/strict";
import {
  expandRegexReplacement,
  findMatches,
  findNextMatchIndex,
  replaceAllMatches,
  replaceMatch
} from "../lib/simple_replace.js";

test("finds plain-text matches without treating the query as regex", () => {
  const result = findMatches("a.b a-b a.b", "a.b");

  assert.equal(result.error, "");
  assert.deepEqual(
    result.matches.map(({ start, end, text }) => ({ start, end, text })),
    [
      { start: 0, end: 3, text: "a.b" },
      { start: 8, end: 11, text: "a.b" }
    ]
  );
});

test("supports case-sensitive and case-insensitive searches", () => {
  const content = "Name name NAME";

  assert.equal(findMatches(content, "name").matches.length, 1);
  assert.equal(
    findMatches(content, "name", { caseSensitive: false }).matches.length,
    3
  );
});

test("returns a helpful error for an invalid regex", () => {
  const result = findMatches("content", "(", { isRegex: true });

  assert.equal(result.matches.length, 0);
  assert.match(result.error, /regular expression|parenthes/i);
});

test("captures numbered and named regex groups", () => {
  const result = findMatches("Mathew, Sony", "(?<last>\\w+), (\\w+)", {
    isRegex: true
  });

  assert.equal(result.matches.length, 1);
  assert.deepEqual(result.matches[0].captures, ["Mathew", "Sony"]);
  assert.deepEqual(result.matches[0].groups, { last: "Mathew" });
});

test("expands standard regex replacement tokens", () => {
  const content = "Mathew, Sony";
  const { matches } = findMatches(content, "(?<last>\\w+), (\\w+)", {
    isRegex: true
  });

  assert.equal(
    expandRegexReplacement("$2 $<last> ($&) $$", matches[0], content),
    "Sony Mathew (Mathew, Sony) $"
  );
});

test("replaces one match and advances past inserted matching text", () => {
  const content = "cat cat";
  const { matches } = findMatches(content, "cat");
  const replaced = replaceMatch(content, matches[0], "cat");
  const nextMatches = findMatches(replaced.content, "cat").matches;

  assert.equal(replaced.content, "cat cat");
  assert.equal(findNextMatchIndex(nextMatches, replaced.nextOffset), 1);
});

test("wraps to the first match when none occur after the cursor", () => {
  const matches = findMatches("cat cat", "cat").matches;

  assert.equal(findNextMatchIndex(matches, 99), 0);
});

test("replace all is single-pass when replacement text also matches", () => {
  const content = "a a";
  const matches = findMatches(content, "a").matches;

  assert.equal(replaceAllMatches(content, matches, "aa"), "aa aa");
});

test("uses capture groups when replacing all regex matches", () => {
  const content = "Ada Lovelace; Grace Hopper";
  const matches = findMatches(content, "(\\w+) (\\w+)", { isRegex: true }).matches;

  assert.equal(
    replaceAllMatches(content, matches, "$2, $1", { isRegex: true }),
    "Lovelace, Ada; Hopper, Grace"
  );
});

test("handles Unicode content and zero-width regex matches safely", () => {
  const unicodeMatches = findMatches("🚀 café 🚀", "🚀").matches;
  const emptyMatches = findMatches("ab", "(?=.)", { isRegex: true }).matches;

  assert.equal(unicodeMatches.length, 2);
  assert.deepEqual(
    emptyMatches.map(({ start, end }) => ({ start, end })),
    [
      { start: 0, end: 0 },
      { start: 1, end: 1 }
    ]
  );
});
