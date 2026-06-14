import test from "node:test";
import assert from "node:assert/strict";
import { decodeBase64Text, encodeBase64Text, normalizeBase64Input } from "../lib/base64.js";

test("encodes plain text as Base64", () => {
  assert.equal(encodeBase64Text("hello"), "aGVsbG8=");
});

test("round-trips UTF-8 text", () => {
  const value = "Cafe\u0301 \u{1F680}";

  assert.equal(decodeBase64Text(encodeBase64Text(value)), value);
});

test("decodes Base64 with whitespace and missing padding", () => {
  assert.equal(decodeBase64Text(" aGVs\nbG8 "), "hello");
  assert.equal(decodeBase64Text("aGVsbG8"), "hello");
});

test("normalizes URL-safe Base64 input", () => {
  assert.equal(normalizeBase64Input("SGVsbG8td29ybGQ_"), "SGVsbG8td29ybGQ/");
});

test("rejects invalid Base64 and non UTF-8 bytes", () => {
  assert.throws(() => decodeBase64Text("not valid!"), /Invalid Base64/);
  assert.throws(() => decodeBase64Text("/w=="));
});
