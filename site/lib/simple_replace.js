const REGEX_SPECIAL_CHARACTERS = /[.*+?^${}()|[\]\\]/g;

function escapeRegex(value) {
  return value.replace(REGEX_SPECIAL_CHARACTERS, "\\$&");
}

function advancePastEmptyMatch(regex, content) {
  if (regex.lastIndex < content.length) {
    regex.lastIndex += 1;
    return;
  }

  regex.lastIndex = content.length + 1;
}

export function createSearchRegex(searchText, { isRegex, caseSensitive }) {
  if (!searchText) {
    return { regex: null, error: "" };
  }

  const source = isRegex ? searchText : escapeRegex(searchText);
  const flags = caseSensitive ? "g" : "gi";

  try {
    return { regex: new RegExp(source, flags), error: "" };
  } catch (error) {
    return {
      regex: null,
      error: error instanceof Error ? error.message : "Invalid regular expression."
    };
  }
}

export function findMatches(
  content,
  searchText,
  { isRegex = false, caseSensitive = true } = {}
) {
  const normalizedContent = String(content ?? "");
  const normalizedSearchText = String(searchText ?? "");
  const { regex, error } = createSearchRegex(normalizedSearchText, {
    isRegex,
    caseSensitive
  });

  if (!regex || error) {
    return { matches: [], error };
  }

  const matches = [];
  let match = regex.exec(normalizedContent);

  while (match) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      captures: match.slice(1),
      groups: match.groups ? { ...match.groups } : null
    });

    if (match[0].length === 0) {
      advancePastEmptyMatch(regex, normalizedContent);
    }

    match = regex.exec(normalizedContent);
  }

  return { matches, error: "" };
}

function resolveNumericCapture(marker, captures) {
  const captureNumber = Number.parseInt(marker, 10);

  if (captureNumber > 0 && captureNumber <= captures.length) {
    return captures[captureNumber - 1] ?? "";
  }

  if (marker.length === 2) {
    const firstDigit = Number.parseInt(marker[0], 10);

    if (firstDigit > 0 && firstDigit <= captures.length) {
      return `${captures[firstDigit - 1] ?? ""}${marker[1]}`;
    }
  }

  return `$${marker}`;
}

export function expandRegexReplacement(replacementText, match, content) {
  const replacement = String(replacementText ?? "");
  const sourceContent = String(content ?? "");

  return replacement.replace(
    /\$(\$|&|`|'|<([^>]*)>|(\d{1,2}))/g,
    (token, marker, groupName, captureNumber) => {
      if (marker === "$") return "$";
      if (marker === "&") return match.text;
      if (marker === "`") return sourceContent.slice(0, match.start);
      if (marker === "'") return sourceContent.slice(match.end);

      if (marker.startsWith("<")) {
        if (!match.groups) return token;
        return match.groups[groupName] ?? "";
      }

      if (captureNumber) {
        return resolveNumericCapture(captureNumber, match.captures);
      }

      return token;
    }
  );
}

function replacementForMatch(content, match, replacementText, isRegex) {
  if (!isRegex) {
    return String(replacementText ?? "");
  }

  return expandRegexReplacement(replacementText, match, content);
}

export function replaceMatch(
  content,
  match,
  replacementText,
  { isRegex = false } = {}
) {
  const normalizedContent = String(content ?? "");
  const replacement = replacementForMatch(
    normalizedContent,
    match,
    replacementText,
    isRegex
  );
  const nextContent =
    normalizedContent.slice(0, match.start) +
    replacement +
    normalizedContent.slice(match.end);
  const replacedEmptyMatch = match.start === match.end && replacement.length === 0;

  return {
    content: nextContent,
    replacement,
    nextOffset: match.start + replacement.length + (replacedEmptyMatch ? 1 : 0)
  };
}

export function replaceAllMatches(
  content,
  matches,
  replacementText,
  { isRegex = false } = {}
) {
  const normalizedContent = String(content ?? "");

  if (!matches.length) {
    return normalizedContent;
  }

  let cursor = 0;
  let result = "";

  matches.forEach((match) => {
    result += normalizedContent.slice(cursor, match.start);
    result += replacementForMatch(
      normalizedContent,
      match,
      replacementText,
      isRegex
    );
    cursor = match.end;
  });

  return result + normalizedContent.slice(cursor);
}

export function findNextMatchIndex(matches, offset) {
  if (!matches.length) return 0;

  const nextIndex = matches.findIndex((match) => match.start >= offset);
  return nextIndex === -1 ? 0 : nextIndex;
}
