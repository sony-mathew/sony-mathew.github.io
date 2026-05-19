import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs/promises";
import path from "path";
import {
  createEditionMetadata,
  generateEdition,
  parseAlJazeeraHtml,
  parseChinaDailyHtml,
  parseWashingtonPostRssItems,
  parseWashingtonPostWorldHtml,
  parseNprRssItems,
  parseProductHuntHtml,
  parseProductHuntFeed,
  parseGoogleNewsReutersItems,
  parseGoogleNewsReutersSearchMetadata,
  parseTheHinduHtml,
  parseYahooWorldIndicesPage,
} from "../scripts/generate-daily-news.mjs";
import { getCollectionEntryData } from "../lib/content.js";
import { getDailyNewsData } from "../lib/daily_news.js";

const FIXTURES_DIR = path.join(process.cwd(), "test", "fixtures", "daily-news");
const MARKET_FIXTURE_URLS = new Set([
  "https://finance.yahoo.com/markets/world-indices/",
  "https://finance.yahoo.com/world-indices/",
]);
const ORIGINAL_OPENROUTER_ENV = {
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  OPENROUTER_MODEL: process.env.OPENROUTER_MODEL,
  OPENROUTER_BASE_URL: process.env.OPENROUTER_BASE_URL,
};

delete process.env.OPENROUTER_API_KEY;
delete process.env.OPENROUTER_MODEL;
delete process.env.OPENROUTER_BASE_URL;

test.after(() => {
  for (const [key, value] of Object.entries(ORIGINAL_OPENROUTER_ENV)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
});

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

test("parses Reuters thumbnails from Google News search metadata", async () => {
  const html = await loadFixture("reuters-google-news-search.html");
  const items = parseGoogleNewsReutersSearchMetadata(html);

  assert.equal(items.length, 2);
  assert.equal(items[0].title, "Bulgaria votes as pro-Russian former president leads the polls");
  assert.equal(
    items[0].url,
    "https://www.reuters.com/world/europe/bulgaria-votes-pro-russian-former-president-leads-polls-2026-04-19/"
  );
  assert.equal(
    items[0].thumbnailUrl,
    "https://www.reuters.com/resizer/v2/reuters-search-one.jpg?auth=abc123&width=1920&quality=80"
  );
});

test("parses NPR RSS items with summaries and non-tracking thumbnails", async () => {
  const xml = await loadFixture("npr.xml");
  const items = parseNprRssItems(xml);

  assert.equal(items.length, 2);
  assert.equal(items[0].title, "NPR headline one");
  assert.equal(items[0].summary, "Lead story from the description field.");
  assert.equal(items[0].thumbnailUrl, "https://npr.brightspotcdn.com/headline-one.jpg");
  assert.equal(items[1].summary, "Lead story two without an image.");
  assert.equal(items[1].thumbnailUrl, null);
});

test("parses Washington Post RSS items with summaries", async () => {
  const xml = await loadFixture("washington-post.xml");
  const items = parseWashingtonPostRssItems(xml);

  assert.equal(items.length, 3);
  assert.equal(items[0].title, "Washington Post headline one");
  assert.equal(items[0].summary, "Lead story summary from the Washington Post world feed.");
  assert.equal(items[0].thumbnailUrl, null);
  assert.equal(items[1].summary, "Second story summary from the Washington Post world feed.");
});

test("parses Washington Post world page cards with thumbnails", async () => {
  const html = await loadFixture("washington-post-world.html");
  const items = parseWashingtonPostWorldHtml(html);

  assert.equal(items.length, 3);
  assert.equal(items[1].title, "Washington Post headline four");
  assert.equal(items[1].summary, "Fourth story summary from the Washington Post world page.");
  assert.equal(items[1].thumbnailUrl, "https://www.washingtonpost.com/resizer/example-story-four.jpg");
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
  assert.equal(items[1].tagline, "The second launch tagline");
});

test("parses Product Hunt RSS feed items", async () => {
  const xml = await loadFixture("product-hunt-feed.xml");
  const items = parseProductHuntFeed(xml);

  assert.equal(items.length, 3);
  assert.equal(items[0].name, "Launch Alpha");
  assert.equal(items[0].tagline, "The first launch tagline");
  assert.equal(items[1].tagline, "The second launch tagline");
  assert.equal(items[2].tagline, "The third launch tagline");
  assert.match(items[0].url, /producthunt\.com\/posts\/launch-alpha/);
});

test("parses Yahoo world indices page and keeps the requested markets", async () => {
  const html = await loadFixture("yahoo-world-indices.html");
  const result = parseYahooWorldIndicesPage(html, "2026-04-19");

  assert.equal(result.failures.length, 0);
  assert.equal(result.items.length, 7);
  assert.equal(result.items.find((item) => item.symbol === "^GSPC")?.sessionDate, "2026-04-19");
  assert.equal(result.items.find((item) => item.symbol === "^GSPC")?.direction, "down");
  assert.equal(result.items.find((item) => item.symbol === "^IXIC")?.label, "NASDAQ Composite");
  assert.equal(
    result.items.find((item) => item.symbol === "MOEX.ME")?.label,
    "Public Joint-Stock Company Moscow Exchange MICEX-RTS"
  );
  assert.equal(result.items.find((item) => item.symbol === "^N225")?.change.toFixed(2), "524.27");
});

test("uses OpenRouter metadata when a key is configured", async () => {
  const originalFetch = global.fetch;
  const requestedBodies = [];

  process.env.OPENROUTER_API_KEY = "test-openrouter-key";
  process.env.OPENROUTER_MODEL = "test/news-editor";
  process.env.OPENROUTER_BASE_URL = "https://openrouter.test/api/v1";
  global.fetch = async (url, options = {}) => {
    requestedBodies.push(JSON.parse(options.body));

    assert.equal(String(url), "https://openrouter.test/api/v1/chat/completions");
    assert.equal(options.headers.Authorization, "Bearer test-openrouter-key");

    return new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: "Daily Brief for April 19, 2026: Markets Slip as Launch Alpha Trends",
                description:
                  "Global headlines focus on Washington Post headline one and NPR headline one. Markets lean lower, led by the S&P 500. Hacker News highlights HN story one. Product Hunt features Launch Alpha.",
              }),
            },
          },
        ],
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const warnings = [];
    const metadata = await createEditionMetadata(
      {
        headlines: [
          {
            title: "Washington Post headline one",
            source: "Washington Post",
            region: "World",
            summary: "Lead story summary.",
          },
          {
            title: "NPR headline one",
            source: "NPR",
            region: "US",
            summary: "Lead story from NPR.",
          },
        ],
        markets: [
          {
            label: "S&P 500",
            region: "United States",
            sessionDate: "2026-04-19",
            direction: "down",
            percentChange: -0.67,
          },
        ],
        hackerNews: [{ title: "HN story one", url: "https://example.com/hn" }],
        productHunt: [{ name: "Launch Alpha", tagline: "The first launch tagline" }],
      },
      "April 19, 2026",
      warnings
    );

    assert.equal(metadata.source, "openrouter");
    assert.equal(
      metadata.title,
      "Daily Brief for April 19, 2026: Markets Slip as Launch Alpha Trends"
    );
    assert.match(metadata.description, /Product Hunt features Launch Alpha/);
    assert.equal(warnings.length, 0);
    assert.equal(requestedBodies[0].model, "test/news-editor");
    assert.equal(requestedBodies[0].response_format.type, "json_object");
  } finally {
    global.fetch = originalFetch;
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.OPENROUTER_MODEL;
    delete process.env.OPENROUTER_BASE_URL;
  }
});

test("dry run emits markdown frontmatter and source notes", async () => {
  const originalFetch = global.fetch;
  const requestedUrls = [];
  const fixtureMap = new Map([
    ["https://feeds.npr.org/1001/rss.xml", "npr.xml"],
    ["https://feeds.washingtonpost.com/rss/world", "washington-post.xml"],
    ["https://www.washingtonpost.com/world/", "washington-post-world.html"],
    ["https://www.chinadaily.com.cn/world/", "china-daily.html"],
    ["https://www.aljazeera.com/news/", "al-jazeera.html"],
    ["https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen", "reuters-google-news.xml"],
    ["https://news.google.com/search?q=site%3Areuters.com%2Fworld%20Reuters&hl=en-US&gl=US&ceid=US%3Aen", "reuters-google-news-search.html"],
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

    if (urlString.startsWith("https://example.com/hn-story-")) {
      const payload = await loadFixture("hn-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.washingtonpost.com/world/2026/04/19/")) {
      const payload = await loadFixture("washington-post-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.chinadaily.com.cn/a/")) {
      const payload = await loadFixture("china-daily-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.aljazeera.com/news/2026/04/19/story-")) {
      const payload = await loadFixture("al-jazeera-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.thehindu.com/news/national/story-")) {
      const payload = await loadFixture("the-hindu-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://news.google.com/rss/articles/")) {
      const payload = await loadFixture("google-news-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.reuters.com/")) {
      const payload = await loadFixture("reuters.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (MARKET_FIXTURE_URLS.has(urlString)) {
      const payload = await loadFixture("yahoo-world-indices.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
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
    assert.match(result.document, /title: "Daily Brief for April 19, 2026: /);
    assert.doesNotMatch(
      result.document,
      /Daily Brief for April 19, 2026: Global Headlines, Markets, Hacker News, Product Hunt/
    );
    assert.match(result.document, /description: "Global headlines include /);
    assert.match(result.document, /The lead story context: /);
    assert.match(result.document, /Additional context: /);
    assert.match(result.document, /The market table tracks /);
    assert.match(result.document, /Hacker News highlights include /);
    assert.match(result.document, /HN link context includes /);
    assert.match(result.document, /Product Hunt features /);
    assert.match(result.document, /Product taglines frame the launches as /);
    assert.match(result.document, /payloadFile: "2026-04-19\.json"/);
    assert.match(result.document, /<div data-daily-news-payload="true"><\/div>/);
    assert.doesNotMatch(result.document, /data-daily-news-section="headlines"/);
    assert.doesNotMatch(result.document, /<table class="min-w-full border-collapse">/);
    assert.equal(result.runtime.reutersMode, "google-news-rss");
    assert.equal(result.runtime.marketMode, "yahoo-world-indices-page");
    assert.match(result.runtime.reutersFeedUrl, /news\.google\.com\/rss\/search/);
    assert.equal(result.payloadFile, "2026-04-19.json");
    assert.equal(Array.isArray(result.payload.headlines), true);
    assert.equal(Array.isArray(result.payload.markets), true);
    assert.equal(Array.isArray(result.payload.hackerNews), true);
    assert.equal(Array.isArray(result.payload.productHunt), true);
    assert.equal(Array.isArray(result.payload.summarySections), true);
    assert.equal(result.payload.summarySections.length, 2);
    assert.equal(result.payload.summarySections[0].title, "News and markets");
    assert.equal(result.payload.summarySections[1].title, "Hacker News and Product Hunt");
    assert.equal(Array.isArray(result.payload.sourceNotes.warnings), true);
    assert.ok(result.payload.headlines.length > 0);
    assert.equal(result.payload.markets.length, 7);
    assert.ok(result.payload.hackerNews.length > 0);
    assert.equal(
      result.payload.hackerNews[0].summary,
      "Hacker News article summary from page metadata that should appear under the technology link card."
    );
    assert.equal(result.payload.sourceNotes.timeZone, "Asia/Kolkata");
    const reutersHeadlines = result.payload.headlines.filter((item) => item.source === "Reuters");
    assert.ok(reutersHeadlines.length >= 2);
    const nprHeadline = result.payload.headlines.find((item) => item.source === "NPR");
    assert.ok(nprHeadline);
    assert.equal(nprHeadline.summary, "Lead story from the description field.");
    assert.equal(nprHeadline.thumbnailUrl, "https://npr.brightspotcdn.com/headline-one.jpg");
    const washingtonPostHeadline = result.payload.headlines.find((item) => item.source === "Washington Post");
    assert.ok(washingtonPostHeadline);
    assert.equal(result.payload.headlines.filter((item) => item.source === "Washington Post").length, 5);
    assert.equal(washingtonPostHeadline.summary, "Lead story summary from the Washington Post world feed.");
    assert.equal(
      washingtonPostHeadline.thumbnailUrl,
      "https://www.washingtonpost.com/resizer/washington-post-meta-image.jpg&w=1440"
    );
    const chinaDailyHeadline = result.payload.headlines.find((item) => item.source === "China Daily");
    assert.ok(chinaDailyHeadline);
    assert.equal(
      chinaDailyHeadline.summary,
      "China Daily article summary paragraph pulled from the article body when metadata descriptions are empty."
    );
    assert.equal(chinaDailyHeadline.thumbnailUrl, "https://www.chinadaily.com.cn/images/world-story-one.jpg");
    const theHinduHeadline = result.payload.headlines.find((item) => item.source === "The Hindu");
    assert.ok(theHinduHeadline);
    assert.equal(
      theHinduHeadline.summary,
      "The Hindu article summary from article metadata that should appear under the headline in the daily news page."
    );
    assert.match(
      theHinduHeadline.thumbnailUrl,
      /^https:\/\/th-i\.thgim\.com\/public\/incoming\/(?:story-one|the-hindu-meta-image)\.jpg$/
    );
    const alJazeeraHeadline = result.payload.headlines.find((item) => item.source === "Al Jazeera");
    assert.ok(alJazeeraHeadline);
    assert.equal(
      alJazeeraHeadline.summary,
      "Al Jazeera article summary from metadata that should appear under the headline in the daily news page."
    );
    const resolvedReutersHeadline = reutersHeadlines.find((item) =>
      item.title.includes("Bulgaria votes as pro-Russian former president")
    );
    const directReutersHeadline = reutersHeadlines.find((item) => item.title === "Exclusive direct Reuters headline");
    assert.ok(resolvedReutersHeadline);
    assert.ok(directReutersHeadline);
    assert.equal(
      resolvedReutersHeadline.url,
      "https://www.reuters.com/world/europe/bulgaria-votes-pro-russian-former-president-leads-polls-2026-04-19/"
    );
    assert.equal(
      resolvedReutersHeadline.summary,
      "Reuters summary from article metadata that should appear under the headline in the daily news page."
    );
    assert.equal(
      resolvedReutersHeadline.thumbnailUrl,
      "https://www.reuters.com/resizer/v2/reuters-search-one.jpg?auth=abc123&width=1920&quality=80"
    );
    assert.equal(resolvedReutersHeadline.sourceIconUrl, undefined);
    assert.equal(
      directReutersHeadline.summary,
      "Reuters summary from article metadata that should appear under the headline in the daily news page."
    );
    assert.equal(
      directReutersHeadline.thumbnailUrl,
      "https://www.reuters.com/resizer/v2/reuters-search-two.jpg?auth=def456&width=1920&quality=80"
    );
    assert.ok(requestedUrls.includes("https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen"));
    assert.ok(requestedUrls.includes("https://news.google.com/search?q=site%3Areuters.com%2Fworld%20Reuters&hl=en-US&gl=US&ceid=US%3Aen"));
    assert.equal(requestedUrls.some((url) => MARKET_FIXTURE_URLS.has(url)), true);
    assert.equal(requestedUrls.includes("https://www.reuters.com/world/"), false);
    assert.equal(requestedUrls.some((url) => url.includes("sitemap_news_index.xml")), false);
    assert.equal(requestedUrls.some((url) => url.includes("query1.finance.yahoo.com")), false);
  } finally {
    global.fetch = originalFetch;
  }
});

test("tailwind config scans generated daily news html sources", async () => {
  const tailwindConfig = await fs.readFile(path.join(process.cwd(), "tailwind.config.js"), "utf8");

  assert.match(tailwindConfig, /\.\/scripts\/\*\*\/\*\.\{js,mjs,ts,jsx,tsx\}/);
  assert.match(tailwindConfig, /\.\/daily-news\/\*\*\/\*\.md/);
});

test("renderer uses only remote thumbnail URLs for daily news cards", async () => {
  const rendererSource = await fs.readFile(path.join(process.cwd(), "components", "daily_news_renderer.js"), "utf8");

  assert.match(rendererSource, /return item\.thumbnailUrl \|\| null;/);
  assert.match(rendererSource, /return item\.sourceIconUrl \|\| null;/);
  assert.doesNotMatch(rendererSource, /localThumbnail/);
});

test("generated daily news markdown loads structured payload through the collection helper", async () => {
  const originalFetch = global.fetch;
  const fixtureMap = new Map([
    ["https://feeds.npr.org/1001/rss.xml", "npr.xml"],
    ["https://feeds.washingtonpost.com/rss/world", "washington-post.xml"],
    ["https://www.washingtonpost.com/world/", "washington-post-world.html"],
    ["https://www.chinadaily.com.cn/world/", "china-daily.html"],
    ["https://www.aljazeera.com/news/", "al-jazeera.html"],
    ["https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen", "reuters-google-news.xml"],
    ["https://news.google.com/search?q=site%3Areuters.com%2Fworld%20Reuters&hl=en-US&gl=US&ceid=US%3Aen", "reuters-google-news-search.html"],
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

    if (urlString.startsWith("https://example.com/hn-story-")) {
      const payload = await loadFixture("hn-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.washingtonpost.com/world/2026/04/19/")) {
      const payload = await loadFixture("washington-post-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.chinadaily.com.cn/a/")) {
      const payload = await loadFixture("china-daily-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.aljazeera.com/news/2026/04/19/story-")) {
      const payload = await loadFixture("al-jazeera-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.thehindu.com/news/national/story-")) {
      const payload = await loadFixture("the-hindu-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.aljazeera.com/wp-content/uploads/")) {
      return new Response(new Uint8Array([1, 2, 3, 4]), {
        status: 200,
        headers: { "content-type": "image/jpeg" },
      });
    }

    if (urlString.startsWith("https://news.google.com/rss/articles/")) {
      const payload = await loadFixture("google-news-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.reuters.com/")) {
      const payload = await loadFixture("reuters.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (MARKET_FIXTURE_URLS.has(urlString)) {
      const payload = await loadFixture("yahoo-world-indices.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
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
    assert.equal(data.dailyNewsPayload.markets.length, 7);
    assert.equal(Array.isArray(data.dailyNewsPayload.hackerNews), true);
    assert.equal(data.dailyNewsPayload.summarySections.length, 2);
    assert.equal(
      data.dailyNewsPayload.headlines.find(
        (item) => item.source === "Reuters" && item.title.includes("Bulgaria votes as pro-Russian former president")
      )?.summary,
      "Reuters summary from article metadata that should appear under the headline in the daily news page."
    );
    assert.equal(
      data.dailyNewsPayload.headlines.find(
        (item) => item.source === "Reuters" && item.title.includes("Bulgaria votes as pro-Russian former president")
      )?.url,
      "https://www.reuters.com/world/europe/bulgaria-votes-pro-russian-former-president-leads-polls-2026-04-19/"
    );
    assert.equal(
      data.dailyNewsPayload.headlines.find(
        (item) => item.source === "Reuters" && item.title.includes("Bulgaria votes as pro-Russian former president")
      )?.thumbnailUrl,
      "https://www.reuters.com/resizer/v2/reuters-search-one.jpg?auth=abc123&width=1920&quality=80"
    );
    assert.equal(
      data.dailyNewsPayload.headlines.find(
        (item) => item.source === "Reuters" && item.title.includes("Bulgaria votes as pro-Russian former president")
      )?.sourceIconUrl,
      undefined
    );
    assert.equal(
      data.dailyNewsPayload.headlines.find(
        (item) => item.source === "Reuters" && item.title === "Exclusive direct Reuters headline"
      )?.summary,
      "Reuters summary from article metadata that should appear under the headline in the daily news page."
    );
    assert.equal(
      data.dailyNewsPayload.headlines.find(
        (item) => item.source === "Reuters" && item.title === "Exclusive direct Reuters headline"
      )?.thumbnailUrl,
      "https://www.reuters.com/resizer/v2/reuters-search-two.jpg?auth=def456&width=1920&quality=80"
    );
    const alJazeeraHeadline = data.dailyNewsPayload.headlines.find((item) => item.source === "Al Jazeera");
    assert.ok(alJazeeraHeadline);
    assert.match(alJazeeraHeadline.thumbnailUrl, /^https:\/\/www\.aljazeera\.com\/wp-content\/uploads\//);
    assert.equal(
      alJazeeraHeadline.summary,
      "Al Jazeera article summary from metadata that should appear under the headline in the daily news page."
    );
    assert.equal("localThumbnail" in alJazeeraHeadline, false);
    const nprHeadline = data.dailyNewsPayload.headlines.find((item) => item.source === "NPR");
    assert.equal(nprHeadline?.summary, "Lead story from the description field.");
    assert.equal(nprHeadline?.thumbnailUrl, "https://npr.brightspotcdn.com/headline-one.jpg");
    const washingtonPostHeadline = data.dailyNewsPayload.headlines.find((item) => item.source === "Washington Post");
    assert.equal(data.dailyNewsPayload.headlines.filter((item) => item.source === "Washington Post").length, 5);
    assert.equal(washingtonPostHeadline?.summary, "Lead story summary from the Washington Post world feed.");
    assert.equal(
      washingtonPostHeadline?.thumbnailUrl,
      "https://www.washingtonpost.com/resizer/washington-post-meta-image.jpg&w=1440"
    );
    const chinaDailyHeadline = data.dailyNewsPayload.headlines.find((item) => item.source === "China Daily");
    assert.equal(
      chinaDailyHeadline?.summary,
      "China Daily article summary paragraph pulled from the article body when metadata descriptions are empty."
    );
    assert.equal(chinaDailyHeadline?.thumbnailUrl, "https://www.chinadaily.com.cn/images/world-story-one.jpg");
    const theHinduHeadline = data.dailyNewsPayload.headlines.find((item) => item.source === "The Hindu");
    assert.equal(
      theHinduHeadline?.summary,
      "The Hindu article summary from article metadata that should appear under the headline in the daily news page."
    );
    assert.match(
      theHinduHeadline?.thumbnailUrl || "",
      /^https:\/\/th-i\.thgim\.com\/public\/incoming\/(?:story-one|the-hindu-meta-image)\.jpg$/
    );
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
    ["https://feeds.washingtonpost.com/rss/world", "washington-post.xml"],
    ["https://www.washingtonpost.com/world/", "washington-post-world.html"],
    ["https://www.chinadaily.com.cn/world/", "china-daily.html"],
    ["https://www.aljazeera.com/news/", "al-jazeera.html"],
    ["https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen", "reuters-google-news.xml"],
    ["https://news.google.com/search?q=site%3Areuters.com%2Fworld%20Reuters&hl=en-US&gl=US&ceid=US%3Aen", "reuters-google-news-search.html"],
    ["https://www.thehindu.com/news/", "the-hindu.html"],
    ["https://www.thehindu.com/news/national/", "the-hindu.html"],
    ["https://hacker-news.firebaseio.com/v0/topstories.json", "hn-topstories.json"],
    ["https://hacker-news.firebaseio.com/v0/item/101.json", "hn-item-101.json"],
    ["https://hacker-news.firebaseio.com/v0/item/102.json", "hn-item-102.json"],
    ["https://hacker-news.firebaseio.com/v0/item/103.json", "hn-item-103.json"],
  ]);

  global.fetch = async (url) => {
    const urlString = String(url);

    if (urlString.startsWith("https://example.com/hn-story-")) {
      const payload = await loadFixture("hn-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.washingtonpost.com/world/2026/04/19/")) {
      const payload = await loadFixture("washington-post-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.chinadaily.com.cn/a/")) {
      const payload = await loadFixture("china-daily-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.aljazeera.com/news/2026/04/19/story-")) {
      const payload = await loadFixture("al-jazeera-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.thehindu.com/news/national/story-")) {
      const payload = await loadFixture("the-hindu-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://news.google.com/rss/articles/")) {
      const payload = await loadFixture("google-news-article.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString.startsWith("https://www.reuters.com/")) {
      const payload = await loadFixture("reuters.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (urlString === "https://www.producthunt.com/") {
      return new Response("upstream error", { status: 503 });
    }

    if (MARKET_FIXTURE_URLS.has(urlString)) {
      const payload = await loadFixture("yahoo-world-indices.html");
      return new Response(payload, {
        status: 200,
        headers: { "content-type": "text/html" },
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
