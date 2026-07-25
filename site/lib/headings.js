function cleanHeadingText(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\\([\\`*_[\]{}()#+\-.!])/g, "$1")
    .trim();
}

export function slugifyHeading(value) {
  return cleanHeadingText(value)
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractHeadings(markdown) {
  const rawHeadings = [];
  let activeFence = null;

  markdown.split("\n").forEach((line) => {
    const fence = line.match(/^\s{0,3}(`{3,}|~{3,})/);

    if (fence) {
      const fenceCharacter = fence[1][0];

      if (!activeFence) {
        activeFence = fenceCharacter;
      } else if (activeFence === fenceCharacter) {
        activeFence = null;
      }

      return;
    }

    if (activeFence) {
      return;
    }

    const heading = line.match(/^\s{0,3}(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/);

    if (!heading) {
      return;
    }

    const text = cleanHeadingText(heading[2]);

    if (text) {
      rawHeadings.push({
        level: heading[1].length,
        text,
      });
    }
  });

  if (rawHeadings.length === 0) {
    return [];
  }

  const baseLevel = Math.min(...rawHeadings.map(({ level }) => level));
  const counters = Array(7).fill(0);
  const slugCounts = new Map();

  return rawHeadings.map(({ level, text }) => {
    counters[level] += 1;

    for (let index = level + 1; index < counters.length; index += 1) {
      counters[index] = 0;
    }

    const baseSlug = slugifyHeading(text) || "section";
    const slugCount = (slugCounts.get(baseSlug) || 0) + 1;
    const id = slugCount === 1 ? baseSlug : `${baseSlug}-${slugCount}`;
    slugCounts.set(baseSlug, slugCount);

    return {
      id,
      level,
      depth: Math.max(0, level - baseLevel),
      number: counters
        .slice(baseLevel, level + 1)
        .filter(Boolean)
        .join("."),
      text,
    };
  });
}
