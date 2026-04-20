import fs from "fs/promises";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import {
  DEFAULT_TIME_ZONE,
  HACKER_NEWS_URL,
  MARKET_MODE,
  MARKET_INDEXES,
  NEWS_SOURCES,
  PRODUCT_HUNT_FEED_URL,
  PRODUCT_HUNT_URL,
  REUTERS_FEED_URL,
  REUTERS_MODE,
  SOURCE_REVISION,
  USER_AGENT,
} from "./daily-news-config.mjs";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DAILY_NEWS_DIR = path.join(ROOT_DIR, "daily-news");
const DAILY_NEWS_PAYLOAD_DIR = path.join(ROOT_DIR, "daily-news-data");

function parseArgs(argv) {
  const args = {
    dryRun: false,
    overwrite: false,
    date: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (current === "--dry-run") {
      args.dryRun = true;
      continue;
    }

    if (current === "--overwrite") {
      args.overwrite = true;
      continue;
    }

    if (current === "--date") {
      args.date = argv[index + 1];
      index += 1;
      continue;
    }
  }

  return args;
}

function getEditionDate(inputDate) {
  if (inputDate) {
    return inputDate;
  }

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: DEFAULT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function formatHumanDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: DEFAULT_TIME_ZONE,
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00+05:30`));
}

function createSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function stripHtml(value = "") {
  let normalized = value;

  for (let pass = 0; pass < 2; pass += 1) {
    normalized = normalized
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#x27;/gi, "'")
      .replace(/&#x2F;/gi, "/");
  }

  return normalized
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeWhitespace(value = "") {
  return String(value).replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function isDateOnlyValue(value = "") {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value).trim());
}

function getDateKeyInTimeZone(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: DEFAULT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getCalendarDayNumber(date) {
  const [year, month, day] = getDateKeyInTimeZone(date).split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / (24 * 60 * 60 * 1000));
}

function getDateOnlyValue(value) {
  if (!value) {
    return null;
  }

  if (isDateOnlyValue(value)) {
    return String(value).trim();
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return getDateKeyInTimeZone(date);
}

function hasExplicitTime(value = "") {
  return /T\d{2}:\d{2}|\b\d{1,2}:\d{2}\b/.test(String(value));
}

function normalizePublishedAtValue(value) {
  if (!value) {
    return null;
  }

  let cleaned = normalizeWhitespace(stripHtml(value))
    .replace(/^(?:Published|Updated|Last updated)(?:\s+On)?\s*[:\-]?\s*/i, "")
    .replace(/\bPublished(?:\s+On)?\b\s*/gi, "")
    .replace(/\bUpdated(?:\s+On)?\b\s*/gi, "")
    .trim();

  if (!cleaned) {
    return null;
  }

  const repeatedMatch = cleaned.match(/^(.{6,80}?)\s+\1$/i);
  if (repeatedMatch) {
    cleaned = repeatedMatch[1].trim();
  }

  cleaned = cleaned.replace(/\bIST\b/gi, "GMT+5:30");

  const parsed = new Date(cleaned);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  if (hasExplicitTime(cleaned)) {
    return parsed.toISOString();
  }

  return getDateKeyInTimeZone(parsed);
}

function extractPublishedAtFromUrl(url) {
  if (!url) {
    return null;
  }

  try {
    const pathname = new URL(url).pathname;

    const slashDateMatch = pathname.match(/\/(20\d{2})\/(\d{1,2})\/(\d{1,2})(?:\/|$)/);
    if (slashDateMatch) {
      const [, year, month, day] = slashDateMatch;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    const compactDateMatch = pathname.match(/\/(?:a\/)?(20\d{2})(\d{2})\/(\d{2})(?:\/|$)/);
    if (compactDateMatch) {
      const [, year, month, day] = compactDateMatch;
      return `${year}-${month}-${day}`;
    }
  } catch (error) {
    return null;
  }

  return null;
}

function extractPublishedAtFromHtml(html, storyUrl = null) {
  if (!html) {
    return extractPublishedAtFromUrl(storyUrl);
  }

  const patterns = [
    /<time[^>]+datetime=["']([^"']+)["'][^>]*>/i,
    /<time[^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+(?:property|name|itemprop)=["'](?:article:published_time|article:modified_time|og:updated_time|pubdate|datePublished|dateModified)["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name|itemprop)=["'](?:article:published_time|article:modified_time|og:updated_time|pubdate|datePublished|dateModified)["']/i,
    /"(?:datePublished|dateModified)"\s*:\s*"([^"]+)"/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    const normalized = normalizePublishedAtValue(match?.[1]);

    if (normalized) {
      return normalized;
    }
  }

  const plainText = normalizeWhitespace(stripHtml(html));
  const textPatterns = [
    /(?:Published|Updated|Last updated)(?:\s+On)?\s+((?:\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}|[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4})(?:\s+\d{1,2}:\d{2}(?:\s*[APMapm]{2})?(?:\s+(?:IST|GMT|UTC))?)?)/i,
  ];

  for (const pattern of textPatterns) {
    const match = plainText.match(pattern);
    const normalized = normalizePublishedAtValue(match?.[1]);

    if (normalized) {
      return normalized;
    }
  }

  return extractPublishedAtFromUrl(storyUrl);
}

function extractMetaContent(html, keys = []) {
  for (const key of keys) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const patterns = [
      new RegExp(
        `<meta[^>]+(?:property|name|itemprop)=["']${escapedKey}["'][^>]+content=["']([^"']+)["']`,
        "i"
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name|itemprop)=["']${escapedKey}["']`,
        "i"
      ),
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]) {
        return match[1];
      }
    }
  }

  return null;
}

function isGoogleNewsUrl(value = "") {
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname === "news.google.com" || hostname.endsWith(".news.google.com");
  } catch (error) {
    return false;
  }
}

function isGoogleHostedImageUrl(value = "") {
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return (
      hostname === "news.google.com" ||
      hostname.endsWith(".news.google.com") ||
      hostname === "lh3.googleusercontent.com" ||
      hostname.endsWith(".googleusercontent.com") ||
      hostname.endsWith(".gstatic.com")
    );
  } catch (error) {
    return false;
  }
}

function sanitizeThumbnailUrl(value) {
  if (!value || isGoogleHostedImageUrl(value)) {
    return null;
  }

  return value;
}

function cleanSummaryText(value = "", title = "") {
  const normalizedSummary = normalizeWhitespace(stripHtml(value))
    .replace(/^Reuters\s*[-:]\s*/i, "")
    .trim();

  if (!normalizedSummary) {
    return null;
  }

  if (title && normalizedSummary.toLowerCase() === normalizeWhitespace(title).toLowerCase()) {
    return null;
  }

  if (
    /google news/i.test(normalizedSummary) &&
    /aggregated from sources all over the world/i.test(normalizedSummary)
  ) {
    return null;
  }

  return normalizedSummary;
}

function extractFirstMeaningfulParagraph(html, storyTitle = "") {
  const paragraphMatches = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)];

  for (const match of paragraphMatches) {
    const text = normalizeWhitespace(stripHtml(match[1] || ""));

    if (!text) {
      continue;
    }

    if (storyTitle && text.toLowerCase() === normalizeWhitespace(storyTitle).toLowerCase()) {
      continue;
    }

    if (/@[a-z0-9.-]+\.[a-z]{2,}/i.test(text)) {
      continue;
    }

    if (/^\(?image credit[:)]?/i.test(text)) {
      continue;
    }

    if (text.length < 40) {
      continue;
    }

    return text;
  }

  return null;
}

function extractArticlePreviewFromHtml(html, storyUrl = null, storyTitle = "", options = {}) {
  if (!html) {
    return {
      summary: null,
      thumbnailUrl: null,
    };
  }

  const thumbnailSource =
    extractMetaContent(html, ["og:image", "twitter:image", "twitter:image:src"]) ||
    html.match(/<img[^>]+src="([^"]+)"/i)?.[1] ||
    null;

  const summarySource =
    extractMetaContent(html, ["og:description", "twitter:description", "description"]) ||
    html.match(/"(?:description|summary)"\s*:\s*"([^"]+)"/i)?.[1] ||
    (options.preferParagraphSummary ? extractFirstMeaningfulParagraph(html, storyTitle) : null) ||
    null;

  return {
    summary: cleanSummaryText(summarySource, storyTitle),
    thumbnailUrl: sanitizeThumbnailUrl(absoluteUrl(storyUrl, thumbnailSource)),
  };
}

function escapeYamlString(value = "") {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value);
}

function absoluteUrl(baseUrl, maybeRelative) {
  if (!maybeRelative) {
    return null;
  }

  try {
    return new URL(maybeRelative, baseUrl).toString();
  } catch (error) {
    return null;
  }
}

function getFileExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const extension = path.extname(pathname).toLowerCase();
    if (extension && extension.length <= 5) {
      return extension;
    }
  } catch (error) {
    return "";
  }

  return "";
}

function formatAbsoluteTimestamp(value) {
  if (!value) {
    return null;
  }

  const dateOnly = isDateOnlyValue(value);
  const date = new Date(dateOnly ? `${value}T00:00:00+05:30` : value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  if (dateOnly) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: DEFAULT_TIME_ZONE,
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: DEFAULT_TIME_ZONE,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function formatRelativeTimeText(value, referenceDate = new Date()) {
  if (!value) {
    return null;
  }

  if (isDateOnlyValue(value)) {
    const date = new Date(`${value}T00:00:00+05:30`);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    const days = Math.max(0, getCalendarDayNumber(referenceDate) - getCalendarDayNumber(date));

    if (days === 0) {
      return "today";
    }

    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const diffMs = Math.max(0, referenceDate.getTime() - date.getTime());
  const minutes = Math.floor(diffMs / (60 * 1000));

  if (minutes < 1) {
    return "just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function getHostnameLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (error) {
    return null;
  }
}

function renderTimeElement(value, referenceDate) {
  if (!value) {
    return "";
  }

  const dateOnly = isDateOnlyValue(value);
  const date = new Date(dateOnly ? `${value}T00:00:00+05:30` : value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const normalizedValue = dateOnly ? value : date.toISOString();
  const relativeText = formatRelativeTimeText(normalizedValue, referenceDate);
  const absoluteLabel = formatAbsoluteTimestamp(normalizedValue);

  if (!relativeText || !absoluteLabel) {
    return "";
  }

  return `<time data-relative-time datetime="${escapeAttribute(
    normalizedValue
  )}" title="${escapeAttribute(
    absoluteLabel
  )}" data-relative-time-granularity="${dateOnly ? "date" : "datetime"}" class="whitespace-nowrap">${escapeHtml(
    relativeText
  )}</time>`;
}

function renderMetaLine(segments) {
  const filteredSegments = segments.filter(Boolean);

  if (filteredSegments.length === 0) {
    return "";
  }

  return `<div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-slate-500">${filteredSegments
    .map(
      (segment, index) =>
        `${index > 0 ? '<span class="text-slate-300" aria-hidden="true">&bull;</span>' : ""}<span>${segment}</span>`
    )
    .join("")}</div>`;
}

function renderSectionHeader(id, title, subtitle) {
  return `<div class="space-y-2">
    <h2 id="${escapeAttribute(id)}" class="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">${escapeHtml(
      title
    )}</h2>
    ${
      subtitle
        ? `<p class="max-w-3xl text-sm leading-6 text-slate-500 md:text-base">${escapeHtml(subtitle)}</p>`
        : ""
    }
  </div>`;
}

function getExternalLinkAttributes() {
  return 'target="_blank" rel="nofollow noopener noreferrer"';
}

function normalizeHtmlBlock(html) {
  return html
    .split("\n")
    .map((line) => line.trimStart())
    .join("\n")
    .trim();
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || 15000);

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": USER_AGENT,
        accept: options.accept || "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        pragma: "no-cache",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }

    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchText(url) {
  const response = await fetchWithTimeout(url, { accept: "text/html,application/xml,text/xml;q=0.9,*/*;q=0.8" });
  return response.text();
}

async function fetchJson(url, options = {}) {
  const response = await fetchWithTimeout(url, {
    accept: "application/json,text/plain;q=0.9,*/*;q=0.8",
    ...options,
  });
  return response.json();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRssItems(xmlText, sourceConfig) {
  const itemMatches = [...xmlText.matchAll(/<item\b[\s\S]*?<\/item>/g)];

  return itemMatches.map((match) => {
    const item = match[0];
    const title = stripHtml(item.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
    const url = stripHtml(item.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "");
    const publishedAt = stripHtml(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || "");
    const description = item.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || "";
    const mediaUrl =
      item.match(/<media:content[^>]+url="([^"]+)"/i)?.[1] ||
      item.match(/<enclosure[^>]+url="([^"]+)"/i)?.[1] ||
      description.match(/<img[^>]+src="([^"]+)"/i)?.[1] ||
      null;

    return {
      title,
      url,
      source: sourceConfig.label,
      region: sourceConfig.region,
      publishedAt,
      summary: null,
      thumbnailUrl: sanitizeThumbnailUrl(absoluteUrl(sourceConfig.url, mediaUrl)),
    };
  });
}

function extractNprThumbnailFromHtml(html = "") {
  const imageMatches = [...html.matchAll(/<img[^>]+src=['"]([^'"]+)['"]/gi)];

  for (const match of imageMatches) {
    const candidate = match[1];

    if (/tracking\/npr-rss-pixel\.png/i.test(candidate) || /media\.npr\.org\/include\/images\/tracking/i.test(candidate)) {
      continue;
    }

    return candidate;
  }

  return null;
}

export function parseNprRssItems(
  xmlText,
  sourceConfig = NEWS_SOURCES.find((source) => source.id === "npr")
) {
  const itemMatches = [...xmlText.matchAll(/<item\b[\s\S]*?<\/item>/g)];

  return itemMatches
    .map((match) => {
      const item = match[0];
      const title = stripHtml(item.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
      const url = stripHtml(item.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "");
      const publishedAt = stripHtml(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || "");
      const description = item.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || "";
      const contentEncoded = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i)?.[1] || "";
      const thumbnailSource =
        extractNprThumbnailFromHtml(contentEncoded) ||
        extractNprThumbnailFromHtml(description) ||
        item.match(/<media:content[^>]+url="([^"]+)"/i)?.[1] ||
        null;

      return {
        title,
        url,
        source: sourceConfig.label,
        region: sourceConfig.region,
        publishedAt,
        summary: cleanSummaryText(description, title),
        thumbnailUrl: sanitizeThumbnailUrl(absoluteUrl(sourceConfig.url, thumbnailSource)),
      };
    })
    .filter((item) => item.title && item.url);
}

export function parseNewYorkTimesRssItems(
  xmlText,
  sourceConfig = NEWS_SOURCES.find((source) => source.id === "new-york-times")
) {
  const itemMatches = [...xmlText.matchAll(/<item\b[\s\S]*?<\/item>/g)];

  return itemMatches
    .map((match) => {
      const item = match[0];
      const title = stripHtml(item.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
      const url = stripHtml(item.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "");
      const publishedAt = stripHtml(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || "");
      const description = item.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || "";
      const thumbnailSource =
        item.match(/<media:content[^>]+url="([^"]+)"/i)?.[1] ||
        item.match(/<enclosure[^>]+url="([^"]+)"/i)?.[1] ||
        null;

      return {
        title,
        url,
        source: sourceConfig.label,
        region: sourceConfig.region,
        publishedAt,
        summary: cleanSummaryText(description, title),
        thumbnailUrl: sanitizeThumbnailUrl(absoluteUrl(sourceConfig.baseUrl || sourceConfig.url, thumbnailSource)),
      };
    })
    .filter((item) => item.title && item.url);
}

export function parseGoogleNewsReutersItems(
  xmlText,
  sourceConfig = NEWS_SOURCES.find((source) => source.id === "reuters")
) {
  return parseRssItems(xmlText, sourceConfig)
    .map((item) => {
      const directUrl = extractDirectReutersUrl(item.url);
      return {
        ...item,
        title: item.title.replace(/\s*-\s*Reuters\s*$/, "").trim(),
        url: directUrl || item.url,
      };
    })
    .filter((item) => item.title && item.url);
}

function extractDirectReutersUrl(url) {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("reuters.com")) {
      return parsed.toString();
    }

    const embeddedParam =
      parsed.searchParams.get("url") ||
      parsed.searchParams.get("u") ||
      parsed.searchParams.get("article");

    if (embeddedParam) {
      const decoded = decodeURIComponent(embeddedParam);
      if (decoded.includes("reuters.com")) {
        return decoded;
      }
    }
  } catch (error) {
    return null;
  }

  return null;
}

function parseHtmlCards(html, sourceConfig, storyMatcher) {
  const articleMatches = [...html.matchAll(/<article\b[\s\S]*?<\/article>/gi)];
  const stories = [];

  for (const articleMatch of articleMatches) {
    const block = articleMatch[0];
    const href = block.match(/<a[^>]+href="([^"]+)"/i)?.[1];
    const titleSource =
      block.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)?.[1] ||
      block.match(/<a[^>]*>([\s\S]*?)<\/a>/i)?.[1] ||
      "";

    const imageSource =
      block.match(/<img[^>]+src="([^"]+)"/i)?.[1] ||
      block.match(/<img[^>]+data-src="([^"]+)"/i)?.[1] ||
      null;

    const story = {
      title: stripHtml(titleSource),
      url: absoluteUrl(sourceConfig.baseUrl || sourceConfig.url, href),
      source: sourceConfig.label,
      region: sourceConfig.region,
      publishedAt: null,
      summary: null,
      thumbnailUrl: absoluteUrl(sourceConfig.baseUrl || sourceConfig.url, imageSource),
    };

    story.publishedAt = extractPublishedAtFromHtml(block, story.url);

    if (storyMatcher(story)) {
      stories.push(story);
    }
  }

  if (stories.length > 0) {
    return stories;
  }

  const anchorMatches = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];

  return anchorMatches
    .map((match) => ({
      title: stripHtml(match[2]),
      url: absoluteUrl(sourceConfig.baseUrl || sourceConfig.url, match[1]),
      source: sourceConfig.label,
      region: sourceConfig.region,
      publishedAt: extractPublishedAtFromUrl(absoluteUrl(sourceConfig.baseUrl || sourceConfig.url, match[1])),
      summary: null,
      thumbnailUrl: null,
    }))
    .filter(storyMatcher);
}

async function hydrateMissingPublishedAt(stories) {
  if (!stories.some((story) => !story.publishedAt && story.url)) {
    return stories;
  }

  const hydratedStories = await Promise.all(
    stories.map(async (story) => {
      if (story.publishedAt || !story.url) {
        return story;
      }

      try {
        const articleHtml = await fetchText(story.url);
        const publishedAt = extractPublishedAtFromHtml(articleHtml, story.url);

        if (publishedAt) {
          return {
            ...story,
            publishedAt,
          };
        }
      } catch (error) {
        return story;
      }

      return story;
    })
  );

  return hydratedStories;
}

async function hydrateArticleMetadata(stories, options = {}) {
  const { preferParagraphSummary = false } = options;

  if (!stories.some((story) => (!story.publishedAt || !story.summary || !story.thumbnailUrl) && story.url)) {
    return stories;
  }

  return Promise.all(
    stories.map(async (story) => {
      if (story.publishedAt && story.summary && story.thumbnailUrl) {
        return story;
      }

      if (!story.url) {
        return story;
      }

      try {
        const articleHtml = await fetchText(story.url);
        const preview = extractArticlePreviewFromHtml(articleHtml, story.url, story.title, {
          preferParagraphSummary,
        });
        const publishedAt = story.publishedAt || extractPublishedAtFromHtml(articleHtml, story.url);

        return {
          ...story,
          publishedAt,
          summary: story.summary || preview.summary,
          thumbnailUrl: story.thumbnailUrl || preview.thumbnailUrl,
        };
      } catch (error) {
        return story;
      }
    })
  );
}

async function hydrateReutersMetadata(stories) {
  return Promise.all(
    stories.map(async (story) => {
      if (!story.url) {
        return story;
      }

      if (isGoogleNewsUrl(story.url)) {
        return {
          ...story,
          summary: null,
          thumbnailUrl: sanitizeThumbnailUrl(story.thumbnailUrl),
        };
      }

      const needsSummary = !story.summary;
      const needsThumbnail = !story.thumbnailUrl;

      if (!needsSummary && !needsThumbnail) {
        return story;
      }

      try {
        const articleHtml = await fetchText(story.url);
        const preview = extractArticlePreviewFromHtml(articleHtml, story.url, story.title);

        return {
          ...story,
          summary: story.summary || preview.summary,
          thumbnailUrl: story.thumbnailUrl || preview.thumbnailUrl,
        };
      } catch (error) {
        return story;
      }
    })
  );
}

export function parseAlJazeeraHtml(html, sourceConfig = NEWS_SOURCES.find((source) => source.id === "al-jazeera")) {
  return parseHtmlCards(html, sourceConfig, (story) => {
    if (!story.url || !story.title) {
      return false;
    }

    return story.url.includes("aljazeera.com/news/");
  });
}

export function parseTheHinduHtml(html, sourceConfig = NEWS_SOURCES.find((source) => source.id === "the-hindu")) {
  return parseHtmlCards(html, sourceConfig, (story) => {
    if (!story.url || !story.title) {
      return false;
    }

    if (!story.url.includes("thehindu.com/news/national/")) {
      return false;
    }

    const weakTitles = new Set(["India", "News", "States", "Cities", "World", "National"]);
    return story.title.length > 18 && !weakTitles.has(story.title);
  });
}

export function parseChinaDailyHtml(html, sourceConfig = NEWS_SOURCES.find((source) => source.id === "china-daily")) {
  return parseHtmlCards(html, sourceConfig, (story) => {
    if (!story.url || !story.title) {
      return false;
    }

    if (!story.url.includes("chinadaily.com.cn") || story.title.length < 18) {
      return false;
    }

    return Boolean(extractPublishedAtFromUrl(story.url));
  });
}

export function parseProductHuntHtml(html) {
  const storyMatches = [...html.matchAll(/<article\b[\s\S]*?<\/article>/gi)];

  const articleItems = storyMatches
    .map((match) => {
      const block = match[0];
      const href = block.match(/<a[^>]+href="([^"]*\/posts\/[^"]+)"/i)?.[1];
      const title =
        block.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)?.[1] ||
        block.match(/aria-label="([^"]+)"/i)?.[1] ||
        "";
      const tagline =
        block.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ||
        block.match(/<span[^>]*>([\s\S]*?)<\/span>/i)?.[1] ||
        "";
      const imageSource =
        block.match(/<img[^>]+src="([^"]+)"/i)?.[1] ||
        block.match(/<img[^>]+data-src="([^"]+)"/i)?.[1] ||
        null;
      const publishedAt =
        block.match(/<time[^>]+datetime="([^"]+)"/i)?.[1] ||
        block.match(/datetime="([^"]+)"/i)?.[1] ||
        null;

      return {
        name: stripHtml(title),
        tagline: stripHtml(tagline),
        url: absoluteUrl(PRODUCT_HUNT_URL, href),
        thumbnailUrl: absoluteUrl(PRODUCT_HUNT_URL, imageSource),
        publishedAt,
      };
    })
    .filter((item) => item.name && item.url);

  if (articleItems.length > 0) {
    return dedupeByUrl(articleItems).slice(0, 5);
  }

  const anchorMatches = [...html.matchAll(/<a[^>]+href="([^"]*\/posts\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  const items = [];

  for (const match of anchorMatches) {
    const url = absoluteUrl(PRODUCT_HUNT_URL, match[1]);
    const name = stripHtml(match[2]);

    if (!url || !name || name.length < 2) {
      continue;
    }

    const matchIndex = match.index || 0;
    const neighborhood = html.slice(Math.max(0, matchIndex - 200), Math.min(html.length, matchIndex + 1200));
    const tagline =
      stripHtml(neighborhood.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] || "") ||
      stripHtml(neighborhood.match(/<span[^>]*>([\s\S]*?)<\/span>/i)?.[1] || "");
    const imageSource =
      neighborhood.match(/<img[^>]+src="([^"]+)"/i)?.[1] ||
      neighborhood.match(/<img[^>]+data-src="([^"]+)"/i)?.[1] ||
      null;
    const publishedAt =
      neighborhood.match(/<time[^>]+datetime="([^"]+)"/i)?.[1] ||
      neighborhood.match(/datetime="([^"]+)"/i)?.[1] ||
      null;

    items.push({
      name,
      tagline: tagline === name ? "" : tagline,
      url,
      thumbnailUrl: absoluteUrl(PRODUCT_HUNT_URL, imageSource),
      publishedAt,
    });
  }

  return dedupeByUrl(items).slice(0, 5);
}

export function parseProductHuntFeed(xmlText) {
  const rssItems = [...xmlText.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => {
    const block = match[0];
    const title = stripHtml(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
    const url = stripHtml(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "");
    const description = block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || "";
    const thumbnailUrl =
      block.match(/<media:content[^>]+url="([^"]+)"/i)?.[1] ||
      description.match(/<img[^>]+src="([^"]+)"/i)?.[1] ||
      null;
    const publishedAt =
      stripHtml(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || "") ||
      stripHtml(block.match(/<published>([\s\S]*?)<\/published>/i)?.[1] || "") ||
      null;
    const tagline = stripHtml(description.replace(/<img[^>]*>/gi, ""));

    return {
      name: title,
      tagline,
      url,
      thumbnailUrl,
      publishedAt,
    };
  });

  const atomEntries = [...xmlText.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => {
    const block = match[0];
    const title = stripHtml(block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
    const url =
      stripHtml(block.match(/<link[^>]+href="([^"]+)"/i)?.[1] || "") ||
      stripHtml(block.match(/<id>([\s\S]*?)<\/id>/i)?.[1] || "");
    const summary =
      block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)?.[1] ||
      block.match(/<content[^>]*>([\s\S]*?)<\/content>/i)?.[1] ||
      "";
    const thumbnailUrl =
      block.match(/<media:content[^>]+url="([^"]+)"/i)?.[1] ||
      summary.match(/<img[^>]+src="([^"]+)"/i)?.[1] ||
      null;
    const publishedAt =
      stripHtml(block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i)?.[1] || "") ||
      stripHtml(block.match(/<published[^>]*>([\s\S]*?)<\/published>/i)?.[1] || "") ||
      null;
    const tagline = stripHtml(summary.replace(/<img[^>]*>/gi, ""));

    return {
      name: title,
      tagline,
      url,
      thumbnailUrl,
      publishedAt,
    };
  });

  return dedupeByUrl([...rssItems, ...atomEntries])
    .filter((item) => item.name && item.url)
    .slice(0, 5);
}

export function parseYahooChartResponse(payload, marketIndex) {
  const chartResult = payload?.chart?.result?.[0];

  if (!chartResult) {
    throw new Error(`Missing chart result for ${marketIndex.label}`);
  }

  const timestamps = chartResult.timestamp || [];
  const closes = chartResult.indicators?.quote?.[0]?.close || [];
  const points = timestamps
    .map((timestamp, index) => ({ timestamp, close: closes[index] }))
    .filter((point) => Number.isFinite(point.close));

  const latestPoint = points[points.length - 1] || null;
  const previousPoint = points[points.length - 2] || null;
  const value = chartResult.meta?.regularMarketPrice ?? latestPoint?.close ?? null;
  const previousClose = chartResult.meta?.previousClose ?? chartResult.meta?.chartPreviousClose ?? previousPoint?.close ?? null;
  const marketTime = chartResult.meta?.regularMarketTime ?? latestPoint?.timestamp ?? null;

  if (!Number.isFinite(value)) {
    throw new Error(`Missing current price for ${marketIndex.label}`);
  }

  if (!Number.isFinite(previousClose)) {
    throw new Error(`Missing previous close for ${marketIndex.label}`);
  }

  if (!Number.isFinite(marketTime)) {
    throw new Error(`Missing market time for ${marketIndex.label}`);
  }

  const change = value - previousClose;
  const percentChange = (change / previousClose) * 100;
  const sessionDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: DEFAULT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(marketTime * 1000));

  return {
    id: marketIndex.id,
    label: marketIndex.label,
    region: marketIndex.region,
    symbol: marketIndex.symbol,
    sessionDate,
    value,
    previousClose,
    change,
    percentChange,
    direction: change >= 0 ? "up" : "down",
  };
}

async function fetchYahooChartMarket(marketIndex) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    marketIndex.symbol
  )}?interval=1d&range=7d&includePrePost=false`;
  let lastError = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const payload = await fetchJson(url, {
        timeoutMs: 20000,
      });
      return parseYahooChartResponse(payload, marketIndex);
    } catch (error) {
      lastError = error;

      if (!String(error.message).includes("HTTP 429") || attempt === 2) {
        break;
      }

      await sleep(400 * (attempt + 1));
    }
  }

  throw lastError;
}

function dedupeByUrl(items) {
  const seen = new Set();

  return items.filter((item) => {
    if (!item.url || seen.has(item.url)) {
      return false;
    }

    seen.add(item.url);
    return true;
  });
}

async function collectNewsSource(sourceConfig) {
  if (sourceConfig.kind === "rss") {
    const xml = await fetchText(sourceConfig.url);
    const items =
      sourceConfig.id === "reuters"
        ? parseGoogleNewsReutersItems(xml, sourceConfig)
        : sourceConfig.id === "npr"
          ? parseNprRssItems(xml, sourceConfig)
        : sourceConfig.id === "new-york-times"
          ? parseNewYorkTimesRssItems(xml, sourceConfig)
        : parseRssItems(xml, sourceConfig).filter((item) => item.title && item.url);
    const dedupedItems = dedupeByUrl(items).slice(0, 5);

    if (sourceConfig.id === "reuters") {
      return hydrateReutersMetadata(dedupedItems);
    }

    return dedupedItems;
  }

  if (sourceConfig.kind !== "html") {
    throw new Error(`Unsupported source kind: ${sourceConfig.kind}`);
  }

  const html = await fetchText(sourceConfig.url);

  if (sourceConfig.id === "al-jazeera") {
    return hydrateMissingPublishedAt(dedupeByUrl(parseAlJazeeraHtml(html, sourceConfig)).slice(0, 5));
  }

  if (sourceConfig.id === "china-daily") {
    const stories = await hydrateMissingPublishedAt(dedupeByUrl(parseChinaDailyHtml(html, sourceConfig)).slice(0, 5));
    return hydrateArticleMetadata(stories, { preferParagraphSummary: true });
  }

  if (sourceConfig.id === "the-hindu") {
    return hydrateArticleMetadata(dedupeByUrl(parseTheHinduHtml(html, sourceConfig)).slice(0, 5));
  }

  throw new Error(`Unsupported HTML source id: ${sourceConfig.id}`);
}

async function collectGlobalHeadlines() {
  const failures = [];
  const successfulSources = [];
  const stories = [];

  for (const sourceConfig of NEWS_SOURCES) {
    try {
      const sourceStories = await collectNewsSource(sourceConfig);

      if (sourceStories.length === 0) {
        throw new Error("No stories parsed");
      }

      successfulSources.push(sourceConfig.label);
      stories.push(...sourceStories);
    } catch (error) {
      failures.push(`${sourceConfig.label}: ${error.message}`);
    }
  }

  return {
    items: stories.slice(0, NEWS_SOURCES.length * 5),
    failures,
    successfulSources,
  };
}

async function collectMarkets() {
  const failures = [];
  const items = [];

  for (const marketIndex of MARKET_INDEXES) {
    try {
      items.push(await fetchYahooChartMarket(marketIndex));
    } catch (error) {
      failures.push(`${marketIndex.label} (${marketIndex.symbol}, ${MARKET_MODE}): ${error.message}`);
    }
  }

  return { items, failures };
}

async function collectHackerNews(editionDate) {
  const editionStart = new Date(`${editionDate}T00:00:00+05:30`);
  const minTimestampSeconds = Math.floor((editionStart.getTime() - 24 * 60 * 60 * 1000) / 1000);
  const topStories = await fetchJson(`${HACKER_NEWS_URL}/topstories.json`);
  const selectedIds = topStories.slice(0, 40);

  const items = [];
  const failures = [];

  for (const storyId of selectedIds) {
    try {
      const item = await fetchJson(`${HACKER_NEWS_URL}/item/${storyId}.json`);

      if (
        item &&
        item.type === "story" &&
        item.url &&
        item.title &&
        item.time >= minTimestampSeconds
      ) {
        items.push({
          title: item.title,
          url: item.url,
          publishedAt: new Date(item.time * 1000).toISOString(),
        });
      }
    } catch (error) {
      failures.push(`HN story ${storyId}: ${error.message}`);
    }

    if (items.length >= 10) {
      break;
    }
  }

  return { items, failures };
}

async function collectProductHunt() {
  try {
    const html = await fetchText(PRODUCT_HUNT_URL);
    const parsed = parseProductHuntHtml(html);

    if (parsed.length > 0) {
      return parsed;
    }
  } catch (error) {
    // Fall through to RSS feed fallback.
  }

  const feedXml = await fetchText(PRODUCT_HUNT_FEED_URL);
  const feedItems = parseProductHuntFeed(feedXml);

  if (feedItems.length > 0) {
    return feedItems;
  }

  return parseProductHuntHtml(feedXml);
}

async function ensureDir(directory) {
  await fs.mkdir(directory, { recursive: true });
}

function renderHeadlineSection(items, generatedAt) {
  const cards = items
    .map((item) => {
      const metaLine = renderMetaLine([
        escapeHtml(item.source),
        escapeHtml(item.region),
        renderTimeElement(item.publishedAt, new Date(generatedAt)),
      ]);

      return `<article class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex flex-col gap-4 p-4 md:flex-row md:items-start md:gap-5 md:p-5">
          ${
            item.thumbnailUrl
              ? `<a href="${escapeAttribute(item.url)}" ${getExternalLinkAttributes()} class="block overflow-hidden rounded-2xl border border-slate-100 md:w-64 md:shrink-0">
                  <img src="${escapeAttribute(item.thumbnailUrl)}" alt="${escapeAttribute(
                    item.title
                  )}" class="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02] md:h-40" />
                </a>`
              : ""
          }
          <div class="min-w-0 flex-1 space-y-2">
            <h3 class="text-lg font-semibold leading-snug text-slate-900 md:text-xl">
              <a href="${escapeAttribute(item.url)}" ${getExternalLinkAttributes()} class="transition hover:text-sky-700">${escapeHtml(
                item.title
              )}</a>
            </h3>
            ${metaLine}
          </div>
        </div>
      </article>`;
    })
    .join("\n");

  return `<section data-daily-news-section="headlines" class="daily-news-section space-y-6">
    ${renderSectionHeader("global-headlines", "Global Headlines", "Top stories across selected outlets, presented in a fast daily brief format.")}
    <div class="space-y-4">
      ${cards}
    </div>
  </section>`;
}

function renderMarketSection(items) {
  const rows = items
    .map((item) => {
      const changeClass = item.direction === "up" ? "text-emerald-600" : "text-rose-600";
      const directionClass =
        item.direction === "up"
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-rose-50 text-rose-700 ring-rose-200";

      return `<tr class="border-t border-slate-100">
        <td class="px-4 py-4 align-top">
          <div class="font-semibold text-slate-900">${escapeHtml(item.label)}</div>
        </td>
        <td class="px-4 py-4 text-sm text-slate-500">${escapeHtml(item.region)}</td>
        <td class="px-4 py-4 text-sm text-slate-500">${escapeHtml(item.sessionDate)}</td>
        <td class="px-4 py-4 text-right text-sm font-medium text-slate-900">${escapeHtml(item.value.toFixed(2))}</td>
        <td class="px-4 py-4 text-right text-sm font-semibold ${changeClass}">${escapeHtml(
          `${item.change.toFixed(2)} (${item.percentChange.toFixed(2)}%)`
        )}</td>
        <td class="px-4 py-4 text-right">
          <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${directionClass}">${escapeHtml(
            item.direction === "up" ? "Up" : "Down"
          )}</span>
        </td>
      </tr>`;
    })
    .join("\n");

  return `<section data-daily-news-section="markets" class="daily-news-section space-y-6">
    ${renderSectionHeader("market-snapshot", "Market Snapshot", "Latest completed sessions across the selected benchmark indexes.")}
    <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead class="bg-slate-950 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-100">
            <tr>
              <th class="px-4 py-3">Index</th>
              <th class="px-4 py-3">Region</th>
              <th class="px-4 py-3">Session Date</th>
              <th class="px-4 py-3 text-right">Value</th>
              <th class="px-4 py-3 text-right">Change</th>
              <th class="px-4 py-3 text-right">Direction</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;
}

function renderHackerNewsSection(items, generatedAt) {
  const cards = items
    .map((item, index) => {
      const metaLine = renderMetaLine([
        escapeHtml(getHostnameLabel(item.url) || "External link"),
        renderTimeElement(item.publishedAt, new Date(generatedAt)),
      ]);

      return `<article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-100 transition duration-200 hover:shadow-md">
        <div class="flex items-start gap-3">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">${index + 1}</div>
          <div class="min-w-0 flex-1 space-y-1.5">
            <h3 class="text-base font-semibold leading-6 text-slate-900 md:text-lg">
              <a href="${escapeAttribute(item.url)}" ${getExternalLinkAttributes()} class="transition hover:text-sky-700">${escapeHtml(
                item.title
              )}</a>
            </h3>
            ${metaLine}
          </div>
        </div>
      </article>`;
    })
    .join("\n");

  return `<section data-daily-news-section="hacker-news" class="daily-news-section space-y-6">
    ${renderSectionHeader("hacker-news", "Hacker News", "Ten notable links from the last day in the Hacker News ecosystem.")}
    <div class="space-y-2.5">
      ${cards}
    </div>
  </section>`;
}

function renderProductHuntSection(items, generatedAt) {
  if (items.length === 0) {
    return `<section data-daily-news-section="product-hunt" class="daily-news-section space-y-6">
      ${renderSectionHeader("product-hunt", "Product Hunt", "New launches surfaced from the public Product Hunt feed and listings.")}
      <div class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        Product Hunt data was unavailable for this edition.
      </div>
    </section>`;
  }

  const cards = items
    .map((item) => {
      const metaLine = renderMetaLine([
        escapeHtml("Product Hunt"),
        renderTimeElement(item.publishedAt, new Date(generatedAt)),
      ]);

      return `<article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100 transition duration-200 hover:shadow-md">
        <div class="flex flex-col gap-3 p-4 md:flex-row md:items-start">
          ${
            item.thumbnailUrl
              ? `<a href="${escapeAttribute(item.url)}" ${getExternalLinkAttributes()} class="block overflow-hidden rounded-2xl border border-slate-100 md:w-32 md:shrink-0">
                  <img src="${escapeAttribute(item.thumbnailUrl)}" alt="${escapeAttribute(
                    item.name
                  )}" class="h-28 w-full object-cover md:h-24" />
                </a>`
              : ""
          }
          <div class="min-w-0 flex-1 space-y-2">
            <div class="space-y-1.5">
              <h3 class="text-lg font-semibold leading-6 text-slate-900">
                <a href="${escapeAttribute(item.url)}" ${getExternalLinkAttributes()} class="transition hover:text-sky-700">${escapeHtml(
                  item.name
                )}</a>
              </h3>
              ${metaLine}
            </div>
            ${
              item.tagline
                ? `<p class="text-sm leading-5 text-slate-600">${escapeHtml(item.tagline)}</p>`
                : ""
            }
          </div>
        </div>
      </article>`;
    })
    .join("\n");

  return `<section data-daily-news-section="product-hunt" class="daily-news-section space-y-6">
    ${renderSectionHeader("product-hunt", "Product Hunt", "Featured products from the latest public Product Hunt listings.")}
    <div class="space-y-3">
      ${cards}
    </div>
  </section>`;
}

function renderSourceNotes({ generatedAt, warnings, marketItems, successfulSources }) {
  const marketSessionLabel = marketItems.length
    ? `Latest market sessions as of ${marketItems
        .map((item) => item.sessionDate)
        .sort()
        .reverse()[0]}`
    : "No market data available";

  return {
    markdown: `<section data-daily-news-section="source-notes" class="daily-news-section space-y-6">
      ${renderSectionHeader("source-notes", "Source Notes", "Generation details, data coverage, and any partial-source warnings for this edition.")}
      <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm ring-1 ring-slate-100">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-1">
            <div class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Generated At</div>
            <div class="text-sm text-slate-700">${escapeHtml(formatAbsoluteTimestamp(generatedAt) || generatedAt)}</div>
          </div>
          <div class="space-y-1">
            <div class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Time Zone</div>
            <div class="text-sm text-slate-700">${escapeHtml(DEFAULT_TIME_ZONE)}</div>
          </div>
          <div class="space-y-1">
            <div class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">News Sources With Data</div>
            <div class="text-sm text-slate-700">${escapeHtml(successfulSources.join(", ") || "None")}</div>
          </div>
          <div class="space-y-1">
            <div class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Market Session Label</div>
            <div class="text-sm text-slate-700">${escapeHtml(marketSessionLabel)}</div>
          </div>
        </div>
        ${
          warnings.length > 0
            ? `<div class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div class="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">Warnings</div>
                <ul class="mt-3 space-y-2 text-sm text-amber-900">
                  ${warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}
                </ul>
              </div>`
            : ""
        }
      </div>
    </section>`,
    marketSessionLabel,
    payload: {
      generatedAt,
      timeZone: DEFAULT_TIME_ZONE,
      successfulSources,
      marketSessionLabel,
      warnings,
    },
  };
}

function estimateReadingTime(markdown) {
  const wordCount = stripHtml(markdown).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function estimateReadingTimeFromPayload(payload) {
  const textParts = [
    ...(payload.headlines || []).flatMap((item) => [item.title, item.source, item.region]),
    ...(payload.markets || []).flatMap((item) => [item.label, item.region, item.sessionDate]),
    ...(payload.hackerNews || []).flatMap((item) => [item.title, item.url]),
    ...(payload.productHunt || []).flatMap((item) => [item.name, item.tagline]),
    ...(payload.sourceNotes?.warnings || []),
    ...(payload.sourceNotes?.successfulSources || []),
    payload.sourceNotes?.marketSessionLabel,
  ]
    .filter(Boolean)
    .join(" ");

  return estimateReadingTime(textParts);
}

function buildFrontmatter({
  title,
  description,
  editionDate,
  readingTime,
  newsSources,
  marketSessionLabel,
  payloadFile,
}) {
  const fields = [
    "---",
    `title: ${escapeYamlString(title)}`,
    `description: ${escapeYamlString(description)}`,
    `date: "${editionDate}"`,
    `editionDate: "${editionDate}"`,
    'author: "Sony Mathew"',
    `readingTime: ${readingTime}`,
    'tags: ["daily-news", "markets", "hacker-news", "product-hunt"]',
    'routePrefix: "/daily-news"',
    "toc: false",
    `newsSources: [${newsSources.map((source) => escapeYamlString(source)).join(", ")}]`,
    `marketSessionLabel: ${escapeYamlString(marketSessionLabel)}`,
    `payloadFile: ${escapeYamlString(payloadFile)}`,
    "---",
    "",
  ];

  return fields.join("\n");
}

export async function generateEdition({ editionDate, dryRun = false, overwrite = false }) {
  const targetPath = path.join(DAILY_NEWS_DIR, `${editionDate}.md`);

  try {
    await fs.access(targetPath);
    if (!overwrite) {
      return {
        status: "skipped",
        editionDate,
        reason: "already_exists",
        targetPath,
      };
    }
  } catch (error) {
    // File does not exist.
  }

  const warnings = [];
  const globalHeadlines = await collectGlobalHeadlines();
  warnings.push(...globalHeadlines.failures);

  const markets = await collectMarkets();
  warnings.push(...markets.failures);

  let hackerNews = { items: [], failures: [] };
  try {
    hackerNews = await collectHackerNews(editionDate);
  } catch (error) {
    hackerNews.failures.push(error.message);
  }
  warnings.push(...hackerNews.failures);

  let productHuntItems = [];
  try {
    productHuntItems = await collectProductHunt();
    if (productHuntItems.length === 0) {
      warnings.push("Product Hunt: No products parsed");
    }
  } catch (error) {
    warnings.push(`Product Hunt: ${error.message}`);
  }

  const majorSectionCount = [
    globalHeadlines.items.length > 0,
    markets.items.length > 0,
    hackerNews.items.length > 0,
    productHuntItems.length > 0,
  ].filter(Boolean).length;

  if (majorSectionCount === 0) {
    throw new Error("All sections failed; refusing to generate an empty edition");
  }

  const enrichedHeadlines = globalHeadlines.items;
  const enrichedProductHunt = productHuntItems;

  const generatedAt = new Date().toISOString();
  const sourceNotes = renderSourceNotes({
    generatedAt,
    warnings,
    marketItems: markets.items,
    successfulSources: globalHeadlines.successfulSources,
  });
  const payloadFile = `${editionDate}.json`;
  const payloadPath = path.join(DAILY_NEWS_PAYLOAD_DIR, payloadFile);
  const payload = {
    headlines: enrichedHeadlines,
    markets: markets.items,
    hackerNews: hackerNews.items,
    productHunt: enrichedProductHunt,
    sourceNotes: sourceNotes.payload,
  };
  const body = '<div data-daily-news-payload="true"></div>';

  const humanDate = formatHumanDate(editionDate);
  const title = `Daily Brief for ${humanDate}: Global Headlines, Markets, Hacker News, Product Hunt`;
  const description = `A daily brief for ${humanDate} covering global headlines, market closes, Hacker News, and Product Hunt.`;
  const readingTime = estimateReadingTimeFromPayload(payload);
  const document = `${buildFrontmatter({
    title,
    description,
    editionDate,
    readingTime,
    newsSources: globalHeadlines.successfulSources,
    marketSessionLabel: sourceNotes.marketSessionLabel,
    payloadFile,
  })}${body}`;

  if (!dryRun) {
    await ensureDir(DAILY_NEWS_DIR);
    await ensureDir(DAILY_NEWS_PAYLOAD_DIR);
    await fs.writeFile(targetPath, document, "utf8");
    await fs.writeFile(payloadPath, JSON.stringify(payload, null, 2), "utf8");
  }

  return {
    status: "generated",
    editionDate,
    targetPath,
    warnings,
    runtime: {
      reutersMode: REUTERS_MODE,
      reutersFeedUrl: REUTERS_FEED_URL,
      marketMode: MARKET_MODE,
      sourceRevision: SOURCE_REVISION,
    },
    sectionCounts: {
      headlines: enrichedHeadlines.length,
      markets: markets.items.length,
      hackerNews: hackerNews.items.length,
      productHunt: enrichedProductHunt.length,
    },
    payload,
    payloadFile,
    payloadPath,
    document,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const editionDate = getEditionDate(args.date);
  const result = await generateEdition({
    editionDate,
    dryRun: args.dryRun,
    overwrite: args.overwrite,
  });

  const output = {
    status: result.status,
    editionDate: result.editionDate,
    targetPath: result.targetPath,
    reason: result.reason || null,
    runtime: result.runtime || {
      reutersMode: REUTERS_MODE,
      reutersFeedUrl: REUTERS_FEED_URL,
      marketMode: MARKET_MODE,
      sourceRevision: SOURCE_REVISION,
    },
    sectionCounts: result.sectionCounts || null,
    warnings: result.warnings || [],
  };

  if (args.dryRun && result.document) {
    output.document = result.document;
  }

  console.log(JSON.stringify(output, null, 2));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(
      JSON.stringify(
        {
          status: "failed",
          error: error.message,
        },
        null,
        2
      )
    );
    process.exitCode = 1;
  });
}
