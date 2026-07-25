import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkExternalLinks from "remark-external-links";
import remarkRehype from "remark-rehype";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { extractHeadings } from "./headings.js";

function getCollectionDirectory(collectionName) {
  return path.join(process.cwd(), collectionName);
}

function getCollectionFileNames(collectionName) {
  const collectionDirectory = getCollectionDirectory(collectionName);

  if (!fs.existsSync(collectionDirectory)) {
    return [];
  }

  return fs
    .readdirSync(collectionDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function readCollectionEntry(collectionName, fileName, { includeContent = true } = {}) {
  const fullPath = path.join(getCollectionDirectory(collectionName), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    id: fileName.replace(/\.md$/, ""),
    ...(includeContent ? { content: matterResult.content } : {}),
    ...matterResult.data,
  };
}

export function getSortedCollectionData(collectionName, { includeContent = false } = {}) {
  const fileNames = getCollectionFileNames(collectionName);
  const allEntriesData = fileNames.map((fileName) =>
    readCollectionEntry(collectionName, fileName, { includeContent })
  );

  return allEntriesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    return -1;
  });
}

export function getAllCollectionIds(collectionName) {
  return getCollectionFileNames(collectionName).map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ""),
    },
  }));
}

export async function getCollectionEntryData(collectionName, id) {
  const fullPath = path.join(getCollectionDirectory(collectionName), `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const headings = extractHeadings(matterResult.content);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkExternalLinks, { target: "_blank", rel: ["nofollow"] })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrismPlus, {
      ignoreMissing: true,
      showLineNumbers: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content);

  let contentHtml = processedContent.toString();
  let headingIndex = 0;

  contentHtml = contentHtml.replace(/<h([1-6])>(.*?)<\/h\1>/g, (match, level, text) => {
    const heading = headings[headingIndex];

    if (!heading || heading.level !== Number(level)) {
      return match;
    }

    headingIndex += 1;
    return `<h${level} id="${heading.id}">${text}</h${level}>`;
  });

  return {
    id,
    contentHtml,
    content: matterResult.content,
    headings,
    ...matterResult.data,
  };
}
