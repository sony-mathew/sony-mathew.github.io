import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs/promises";
import path from "path";
import {
  generateEdition,
  parseAlJazeeraHtml,
  parseChinaDailyHtml,
  parseProductHuntHtml,
  parseProductHuntFeed,
  parseGoogleNewsReutersItems,
  parseTheHinduHtml,
  parseYahooChartResponse,
} from "../scripts/generate-daily-news.mjs";
import { getCollectionEntryData } from "../lib/content.js";
import { getDailyNewsData } from "../lib/daily_news.js";

const FIXTURES_DIR = path.join(process.cwd(), "test", "fixtures", "daily-news");

async function loadFixture(fileName) {
  return fs.readFile(path.join(FIXTURES_DIR, fileName), "utf8");
}

test("parses Al Jazeera article cards", async () => {
  const html = await loadFixture("al-jazeera.html");
  const items = parseAlJazeeraHtml(html);

  assert.equal(items.length, 2);
  assert.equal(items[0].title, "Al Jazeera headline one");
  assert.equal(items[0].url, "https://www.aljazeera.com/news/2026/04/19/story-one");
  assert.equal(items[0].publishedAt, "2026-04-19T06:30:00.000Z");
});

test("parses Reuters Google News feed items and prefers direct Reuters links when available", async () => {
  const xml = await loadFixture("reuters-google-news.xml");
  const items = parseGoogleNewsReutersItems(xml);

  assert.equal(items.length, 2);
  assert.equal(items[0].title, "Bulgaria votes as pro-Russian former president leads the polls");
  assert.match(items[0].url, /^https:\/\/news\.google\.com\//);
  assert.equal(items[1].title, "Exclusive direct Reuters headline");
  assert.equal(items[1].url, "https://www.reuters.com/world/europe/exclusive-direct-headline-2026-04-19/");
  assert.equal(items[0].publishedAt, "Sun, 19 Apr 2026 01:08:00 GMT");
});

test("parses China Daily article cards", async () => {
  const html = await loadFixture("china-daily.html");
  const items = parseChinaDailyHtml(html);

  assert.equal(items.length, 2);
  assert.match(items[0].url, /chinadaily\.com\.cn/);
  assert.equal(items[0].publishedAt, "2026-04-19T03:00:00.000Z");
});

test("parses The Hindu article cards", async () => {
  const html = await loadFixture("the-hindu.html");
  const items = parseTheHinduHtml(html);

  assert.equal(items.length, 2);
  assert.match(items[0].url, /thehindu\.com\/news\/national\/story-one/);
  assert.equal(items[0].publishedAt, "2026-04-19T04:45:00.000Z");
  assert.equal(items[1].publishedAt, "2026-04-19T09:30:00.000Z");
});

test("parses Product Hunt product cards", async () => {
  const html = await loadFixture("product-hunt.html");
  const items = parseProductHuntHtml(html);

  assert.equal(items.length, 2);
  assert.equal(items[0].name, "Launch Alpha");
  assert.equal(items[0].tagline, "The first launch tagline");
});

test("parses Product Hunt RSS feed items", async () => {
  const xml = await loadFixture("product-hunt-feed.xml");
  const items = parseProductHuntFeed(xml);

  assert.equal(items.length, 2);
  assert.equal(items[0].name, "Launch Alpha");
  assert.match(items[0].url, /producthunt\.com\/posts\/launch-alpha/);
});

test("parses Yahoo chart response and keeps actual session date", async () => {
  const payload = JSON.parse(await loadFixture("yahoo-chart.json"));
  const market = parseYahooChartResponse(payload, {
    id: "sp-500",
    label: "S&P 500",
    region: "US",
    symbol: "^GSPC",
  });

  assert.equal(market.sessionDate, "2026-04-18");
  assert.equal(market.direction, "up");
  assert.equal(market.change.toFixed(2), "40.30");
});

test("dry run emits markdown frontmatter and source notes", async () => {
  const originalFetch = global.fetch;
  const requestedUrls = [];
  const fixtureMap = new Map([
    ["https://feeds.npr.org/1001/rss.xml", "npr.xml"],
    ["https://www.chinadaily.com.cn/world/", "china-daily.html"],
    ["https://www.aljazeera.com/news/", "al-jazeera.html"],
    ["https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen", "reuters-google-news.xml"],
    ["https://www.thehindu.com/news/", "the-hindu.html"],
    ["https://www.thehindu.com/news/national/", "the-hindu.html"],
    ["https://www.producthunt.com/", "product-hunt.html"],
    ["https://www.producthunt.com/feed", "product-hunt-feed.xml"],
    ["https://hacker-news.firebaseio.com/v0/topstories.json", "hn-topstories.json"],
    ["https://hacker-news.firebaseio.com/v0/item/101.json", "hn-item-101.json"],
    ["https://hacker-news.firebaseio.com/v0/item/102.json", "hn-item-102.json"],
    ["https://hacker-news.firebaseio.com/v0/item/103.json", "hn-item-103.json"],
  ]);

  global.fetch = async (url) => {
    const urlString = String(url);
    requestedUrls.push(urlString);

    if (urlString.startsWith("https://query1.finance.yahoo.com/v8/finance/chart/")) {
      const payload = await loadFixture("yahoo-chart.json");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const fixtureName = fixtureMap.get(urlString);

    if (!fixtureName) {
      throw new Error(`Missing fixture for ${urlString}`);
    }

    const payload = await loadFixture(fixtureName);
    const contentType = fixtureName.endsWith(".json")
      ? "application/json"
      : fixtureName.endsWith(".xml")
        ? "application/xml"
        : "text/html";

    return new Response(payload, {
      status: 200,
      headers: { "content-type": contentType },
    });
  };

  try {
    const result = await generateEdition({
      editionDate: "2026-04-19",
      dryRun: true,
      overwrite: true,
    });

    assert.equal(result.status, "generated");
    assert.match(result.document, /title: "Daily Brief for April 19, 2026/);
    assert.match(result.document, /payloadFile: "2026-04-19\.json"/);
    assert.match(result.document, /<div data-daily-news-payload="true"><\/div>/);
    assert.doesNotMatch(result.document, /data-daily-news-section="headlines"/);
    assert.doesNotMatch(result.document, /<table class="min-w-full border-collapse">/);
    assert.equal(result.runtime.reutersMode, "google-news-rss");
    assert.equal(result.runtime.marketMode, "yahoo-chart-api");
    assert.match(result.runtime.reutersFeedUrl, /news\.google\.com\/rss\/search/);
    assert.equal(result.payloadFile, "2026-04-19.json");
    assert.equal(Array.isArray(result.payload.headlines), true);
    assert.equal(Array.isArray(result.payload.markets), true);
    assert.equal(Array.isArray(result.payload.hackerNews), true);
    assert.equal(Array.isArray(result.payload.productHunt), true);
    assert.equal(Array.isArray(result.payload.sourceNotes.warnings), true);
    assert.ok(result.payload.headlines.length > 0);
    assert.ok(result.payload.hackerNews.length > 0);
    assert.equal(result.payload.sourceNotes.timeZone, "Asia/Kolkata");
    assert.ok(requestedUrls.includes("https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen"));
    assert.equal(requestedUrls.some((url) => url.includes("query1.finance.yahoo.com/v8/finance/chart/")), true);
    assert.equal(requestedUrls.includes("https://www.reuters.com/world/"), false);
    assert.equal(requestedUrls.some((url) => url.includes("sitemap_news_index.xml")), false);
    assert.equal(requestedUrls.some((url) => url.includes("https://finance.yahoo.com/quote/")), false);
  } finally {
    global.fetch = originalFetch;
  }
});

test("tailwind config scans generated daily news html sources", async () => {
  const tailwindConfig = await fs.readFile(path.join(process.cwd(), "tailwind.config.js"), "utf8");

  assert.match(tailwindConfig, /\.\/scripts\/\*\*\/\*\.\{js,mjs,ts,jsx,tsx\}/);
  assert.match(tailwindConfig, /\.\/daily-news\/\*\*\/\*\.md/);
});

test("generated daily news markdown loads structured payload through the collection helper", async () => {
  const originalFetch = global.fetch;
  const fixtureMap = new Map([
    ["https://feeds.npr.org/1001/rss.xml", "npr.xml"],
    ["https://www.chinadaily.com.cn/world/", "china-daily.html"],
    ["https://www.aljazeera.com/news/", "al-jazeera.html"],
    ["https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen", "reuters-google-news.xml"],
    ["https://www.thehindu.com/news/", "the-hindu.html"],
    ["https://www.thehindu.com/news/national/", "the-hindu.html"],
    ["https://www.producthunt.com/", "product-hunt.html"],
    ["https://www.producthunt.com/feed", "product-hunt-feed.xml"],
    ["https://hacker-news.firebaseio.com/v0/topstories.json", "hn-topstories.json"],
    ["https://hacker-news.firebaseio.com/v0/item/101.json", "hn-item-101.json"],
    ["https://hacker-news.firebaseio.com/v0/item/102.json", "hn-item-102.json"],
    ["https://hacker-news.firebaseio.com/v0/item/103.json", "hn-item-103.json"],
  ]);
  const tempId = "2099-01-02";
  const tempPayloadPath = path.join(process.cwd(), "daily-news-data", `${tempId}.json`);

  global.fetch = async (url) => {
    const urlString = String(url);

    if (urlString.startsWith("https://query1.finance.yahoo.com/v8/finance/chart/")) {
      const payload = await loadFixture("yahoo-chart.json");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const fixtureName = fixtureMap.get(urlString);

    if (!fixtureName) {
      throw new Error(`Missing fixture for ${urlString}`);
    }

    const payload = await loadFixture(fixtureName);
    const contentType = fixtureName.endsWith(".json")
      ? "application/json"
      : fixtureName.endsWith(".xml")
        ? "application/xml"
        : "text/html";

    return new Response(payload, {
      status: 200,
      headers: { "content-type": contentType },
    });
  };

  try {
    await generateEdition({
      editionDate: tempId,
      dryRun: false,
      overwrite: true,
    });

    const rawData = await getCollectionEntryData("daily-news", tempId);
    const data = await getDailyNewsData(tempId);
    const payloadFromDisk = JSON.parse(await fs.readFile(tempPayloadPath, "utf8"));

    assert.match(rawData.contentHtml, /data-daily-news-payload="true"/);
    assert.doesNotMatch(rawData.contentHtml, /data-daily-news-section="headlines"/);
    assert.equal(data.payloadFile, `${tempId}.json`);
    assert.equal(data.dailyNewsPayload.headlines.length > 0, true);
    assert.equal(Array.isArray(data.dailyNewsPayload.hackerNews), true);
    assert.deepEqual(data.dailyNewsPayload, payloadFromDisk);
  } finally {
    global.fetch = originalFetch;
    await fs.unlink(path.join(process.cwd(), "daily-news", `${tempId}.md`)).catch(() => {});
    await fs.unlink(tempPayloadPath).catch(() => {});
  }
});

test("daily news loader falls back cleanly for non-payload markdown editions", async () => {
  const tempId = "2099-01-03";
  const tempMarkdownPath = path.join(process.cwd(), "daily-news", `${tempId}.md`);

  await fs.writeFile(
    tempMarkdownPath,
    `---
title: "Legacy Daily News"
description: "Legacy edition"
date: "2099-01-03"
editionDate: "2099-01-03"
author: "Sony Mathew"
readingTime: 1
tags: ["daily-news"]
routePrefix: "/daily-news"
toc: false
---
Legacy fallback content.
`,
    "utf8"
  );

  try {
    const data = await getDailyNewsData(tempId);

    assert.equal(data.dailyNewsPayload, null);
    assert.match(data.contentHtml, /Legacy fallback content/);
  } finally {
    await fs.unlink(tempMarkdownPath).catch(() => {});
  }
});

test("skips generation when the target file already exists and overwrite is false", async () => {
  const targetPath = path.join(process.cwd(), "daily-news", "2099-01-01.md");
  await fs.writeFile(targetPath, "existing");

  try {
    const result = await generateEdition({
      editionDate: "2099-01-01",
      dryRun: false,
      overwrite: false,
    });

    assert.equal(result.status, "skipped");
    assert.equal(result.reason, "already_exists");
  } finally {
    await fs.unlink(targetPath);
  }
});

test("continues generating when Product Hunt is unavailable", async () => {
  const originalFetch = global.fetch;
  const fixtureMap = new Map([
    ["https://feeds.npr.org/1001/rss.xml", "npr.xml"],
    ["https://www.chinadaily.com.cn/world/", "china-daily.html"],
    ["https://www.aljazeera.com/news/", "al-jazeera.html"],
    ["https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen", "reuters-google-news.xml"],
    ["https://www.thehindu.com/news/", "the-hindu.html"],
    ["https://www.thehindu.com/news/national/", "the-hindu.html"],
    ["https://hacker-news.firebaseio.com/v0/topstories.json", "hn-topstories.json"],
    ["https://hacker-news.firebaseio.com/v0/item/101.json", "hn-item-101.json"],
    ["https://hacker-news.firebaseio.com/v0/item/102.json", "hn-item-102.json"],
    ["https://hacker-news.firebaseio.com/v0/item/103.json", "hn-item-103.json"],
  ]);

  global.fetch = async (url) => {
    const urlString = String(url);

    if (urlString === "https://www.producthunt.com/") {
      return new Response("upstream error", { status: 503 });
    }

    if (urlString.startsWith("https://query1.finance.yahoo.com/v8/finance/chart/")) {
      const payload = await loadFixture("yahoo-chart.json");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const fixtureName = fixtureMap.get(urlString);

    if (!fixtureName) {
      throw new Error(`Missing fixture for ${urlString}`);
    }

    const payload = await loadFixture(fixtureName);
    const contentType = fixtureName.endsWith(".json")
      ? "application/json"
      : fixtureName.endsWith(".xml")
        ? "application/xml"
        : "text/html";

    return new Response(payload, {
      status: 200,
      headers: { "content-type": contentType },
    });
  };

  try {
    const result = await generateEdition({
      editionDate: "2026-04-20",
      dryRun: true,
      overwrite: true,
    });

    assert.equal(result.status, "generated");
    assert.equal(result.sectionCounts.productHunt, 0);
    assert.match(result.document, /<div data-daily-news-payload="true"><\/div>/);
    assert.deepEqual(result.payload.productHunt, []);
    assert.match(
      result.payload.sourceNotes.warnings.join("\n"),
      /Product Hunt: Missing fixture for https:\/\/www\.producthunt\.com\/feed/
    );
  } finally {
    global.fetch = originalFetch;
  }
});
