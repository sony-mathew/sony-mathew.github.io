import fs from "fs";
import path from "path";
import {
  getAllCollectionIds,
  getCollectionEntryData,
  getSortedCollectionData,
} from "./content.js";

const COLLECTION_NAME = "daily-news";
const PAYLOAD_DIRECTORY = path.join(process.cwd(), "daily-news-data");
const DAILY_NEWS_DATE_PREFIX =
  /^(?:Daily (?:Brief|News) for\s+)?(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\s*:\s*/i;

export function removeDailyNewsDatePrefix(title = "") {
  const normalizedTitle = String(title).trim();
  const titleWithoutDate = normalizedTitle.replace(DAILY_NEWS_DATE_PREFIX, "").trim();

  return titleWithoutDate || normalizedTitle;
}

function withDisplayTitle(entry) {
  let archiveThumbnailUrl = null;

  if (entry.payloadFile) {
    const payloadPath = path.join(PAYLOAD_DIRECTORY, entry.payloadFile);

    if (fs.existsSync(payloadPath)) {
      try {
        const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
        archiveThumbnailUrl =
          payload.headlines?.[0]?.thumbnailUrl ||
          payload.headlines?.find((headline) => headline.thumbnailUrl)?.thumbnailUrl ||
          null;
      } catch {
        archiveThumbnailUrl = null;
      }
    }
  }

  return {
    ...entry,
    title: removeDailyNewsDatePrefix(entry.title),
    archiveThumbnailUrl,
  };
}

export function getSortedDailyNewsData() {
  return getSortedCollectionData(COLLECTION_NAME).map(withDisplayTitle);
}

export function getAllDailyNewsIds() {
  return getAllCollectionIds(COLLECTION_NAME);
}

export async function getDailyNewsData(id) {
  const entry = await getCollectionEntryData(COLLECTION_NAME, id);
  let dailyNewsPayload = null;

  if (entry.payloadFile) {
    const payloadPath = path.join(PAYLOAD_DIRECTORY, entry.payloadFile);

    if (fs.existsSync(payloadPath)) {
      try {
        dailyNewsPayload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
      } catch (err) {
        console.error(`Failed to parse daily news payload at ${payloadPath}:`, err);
        dailyNewsPayload = null;
      }
    }
  }

  return {
    ...entry,
    title: removeDailyNewsDatePrefix(entry.title),
    dailyNewsPayload,
  };
}
