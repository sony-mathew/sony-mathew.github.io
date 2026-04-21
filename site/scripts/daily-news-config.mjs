export const DEFAULT_TIME_ZONE = "Asia/Kolkata";
export const SOURCE_REVISION = "2026-04-21-google-news-reuters-yahoo-world-indices-scrape";
export const REUTERS_MODE = "google-news-rss";
export const MARKET_MODE = "yahoo-world-indices-page";
export const REUTERS_FEED_URL =
  "https://news.google.com/rss/search?q=site%3Areuters.com/world&hl=en-US&gl=US&ceid=US%3Aen";
export const MARKET_SOURCE_URLS = [
  "https://finance.yahoo.com/markets/world-indices/",
  "https://finance.yahoo.com/world-indices/",
];

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
  { id: "sp-500", label: "S&P 500", region: "US", symbol: "^GSPC" },
  { id: "nasdaq-composite", label: "NASDAQ Composite", region: "US", symbol: "^IXIC" },
  { id: "euronext-100", label: "Euronext 100 Index", region: "Europe", symbol: "^N100" },
  {
    id: "moex",
    label: "Public Joint-Stock Company Moscow Exchange MICEX-RTS",
    region: "Europe",
    symbol: "MOEX.ME",
  },
  { id: "hang-seng", label: "HANG SENG INDEX", region: "Asia", symbol: "^HSI" },
  { id: "nikkei-225", label: "Nikkei 225", region: "Asia", symbol: "^N225" },
  { id: "sensex", label: "S&P BSE SENSEX", region: "India", symbol: "^BSESN" },
];

export const HACKER_NEWS_URL = "https://hacker-news.firebaseio.com/v0";
export const PRODUCT_HUNT_URL = "https://www.producthunt.com/";
export const PRODUCT_HUNT_FEED_URL = "https://www.producthunt.com/feed";
export const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36";
