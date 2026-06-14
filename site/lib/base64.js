const BASE64_CHARACTER_PATTERN = /^[A-Za-z0-9+/]*={0,2}$/;

export function normalizeBase64Input(value) {
  const compactValue = String(value || "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  if (compactValue.length % 4 === 1) {
    throw new Error("Invalid Base64 length");
  }

  const paddedValue = compactValue + "=".repeat((4 - (compactValue.length % 4)) % 4);

  if (!BASE64_CHARACTER_PATTERN.test(paddedValue)) {
    throw new Error("Invalid Base64 characters");
  }

  return paddedValue;
}

function bytesToBase64(bytes) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }

  let binaryValue = "";
  const chunkSize = 8192;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binaryValue += String.fromCharCode(...chunk);
  }

  return btoa(binaryValue);
}

function base64ToBytes(value) {
  if (typeof Buffer !== "undefined") {
    return Uint8Array.from(Buffer.from(value, "base64"));
  }

  const binaryValue = atob(value);
  const bytes = new Uint8Array(binaryValue.length);

  for (let index = 0; index < binaryValue.length; index += 1) {
    bytes[index] = binaryValue.charCodeAt(index);
  }

  return bytes;
}

export function encodeBase64Text(value) {
  return bytesToBase64(new TextEncoder().encode(String(value || "")));
}

export function decodeBase64Text(value) {
  const normalizedValue = normalizeBase64Input(value);

  if (!normalizedValue) {
    return "";
  }

  return new TextDecoder("utf-8", { fatal: true }).decode(base64ToBytes(normalizedValue));
}
