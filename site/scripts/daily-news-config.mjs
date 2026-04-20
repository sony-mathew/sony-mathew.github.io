export const DEFAULT_TIME_ZONE = "Asia/Kolkata";
export const SOURCE_REVISION = "2026-04-20-google-news-reuters-yahoo-chart-html-times-compact-cards-nyt";
export const REUTERS_MODE = "google-news-rss";
export const MARKET_MODE = "yahoo-chart-api";
export const REUTERS_FEED_URL =
  "https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen";

export const NEWS_SOURCES = [
  {
    id: "new-york-times",
    label: "New York Times",
    region: "Global",
    kind: "rss",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    baseUrl: "https://www.nytimes.com",
  },
  {
    id: "al-jazeera",
    label: "Al Jazeera",
    region: "Middle East",
    kind: "html",
    url: "https://www.aljazeera.com/news/",
    baseUrl: "https://www.aljazeera.com",
  },
  {
    id: "npr",
    label: "NPR",
    region: "US",
    kind: "rss",
    url: "https://feeds.npr.org/1001/rss.xml",
  },
  {
    id: "china-daily",
    label: "China Daily",
    region: "China",
    kind: "html",
    url: "https://www.chinadaily.com.cn/world/",
    baseUrl: "https://www.chinadaily.com.cn",
  },
  {
    id: "the-hindu",
    label: "The Hindu",
    region: "India",
    kind: "html",
    url: "https://www.thehindu.com/news/national/",
    baseUrl: "https://www.thehindu.com",
  },
  {
    id: "reuters",
    label: "Reuters",
    region: "Global",
    kind: "rss",
    url: REUTERS_FEED_URL,
    baseUrl: "https://www.reuters.com",
  },
];

export const MARKET_INDEXES = [
  { id: "nifty-50", label: "Nifty 50", region: "India", symbol: "^NSEI" },
  { id: "sensex", label: "Sensex", region: "India", symbol: "^BSESN" },
  { id: "sp-500", label: "S&P 500", region: "US", symbol: "^GSPC" },
  { id: "sp-100", label: "S&P 100", region: "US", symbol: "^OEX" },
  { id: "nikkei-225", label: "Nikkei 225", region: "Asia", symbol: "^N225" },
  { id: "hang-seng", label: "Hang Seng", region: "Asia", symbol: "^HSI" },
  { id: "shanghai-composite", label: "Shanghai Composite", region: "Asia", symbol: "000001.SS" },
  { id: "tasi", label: "Tadawul All Share Index", region: "Middle East", symbol: "^TASI.SR" },
  { id: "egx-30", label: "EGX 30", region: "Africa", symbol: "^CASE30" },
];

export const HACKER_NEWS_URL = "https://hacker-news.firebaseio.com/v0";
export const PRODUCT_HUNT_URL = "https://www.producthunt.com/";
export const PRODUCT_HUNT_FEED_URL = "https://www.producthunt.com/feed";
export const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36";
