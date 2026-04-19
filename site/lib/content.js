import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkExternalLinks from "remark-external-links";
import remarkRehype from "remark-rehype";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import remarkParse from "remark-parse";

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

function readCollectionEntry(collectionName, fileName) {
  const fullPath = path.join(getCollectionDirectory(collectionName), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    id: fileName.replace(/\.md$/, ""),
    content: matterResult.content,
    ...matterResult.data,
  };
}

export function getSortedCollectionData(collectionName) {
  const fileNames = getCollectionFileNames(collectionName);
  const allEntriesData = fileNames.map((fileName) =>
    readCollectionEntry(collectionName, fileName)
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

  contentHtml = contentHtml.replace(/<h(\d)>(.*?)<\/h\d>/g, (match, p1, p2) => {
    const headingId = p2
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    return `<h${p1} id="${headingId}">${p2}</h${p1}>`;
  });

  return {
    id,
    contentHtml,
    content: matterResult.content,
    ...matterResult.data,
  };
}
