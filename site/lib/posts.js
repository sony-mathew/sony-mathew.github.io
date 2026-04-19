import {
  getAllCollectionIds,
  getCollectionEntryData,
  getSortedCollectionData,
} from "./content";

export function getSortedPostsData() {
  return getSortedCollectionData("posts");
}

export function getAllPostIds() {
  return getAllCollectionIds("posts");
}

export async function getPostData(id) {
  return getCollectionEntryData("posts", id);
}
