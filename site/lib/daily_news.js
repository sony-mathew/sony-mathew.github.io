import fs from "fs";
import path from "path";
import {
  getAllCollectionIds,
  getCollectionEntryData,
  getSortedCollectionData,
} from "./content.js";

const COLLECTION_NAME = "daily-news";
const PAYLOAD_DIRECTORY = path.join(process.cwd(), "daily-news-data");

export function getSortedDailyNewsData() {
  return getSortedCollectionData(COLLECTION_NAME);
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
      dailyNewsPayload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
    }
  }

  return {
    ...entry,
    dailyNewsPayload,
  };
}
