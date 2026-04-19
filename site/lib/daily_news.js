import {
  getAllCollectionIds,
  getCollectionEntryData,
  getSortedCollectionData,
} from "./content";

const COLLECTION_NAME = "daily-news";

export function getSortedDailyNewsData() {
  return getSortedCollectionData(COLLECTION_NAME);
}

export function getAllDailyNewsIds() {
  return getAllCollectionIds(COLLECTION_NAME);
}

export function getDailyNewsData(id) {
  return getCollectionEntryData(COLLECTION_NAME, id);
}
