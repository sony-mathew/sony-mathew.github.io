import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkExternalLinks from "remark-external-links";
import remarkRehype from "remark-rehype";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import remarkParse from "remark-parse";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use unified for all processing in a single pipeline
  const processedContent = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkExternalLinks, { target: "_blank", rel: ["nofollow"] }) // Handle external links
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST, allowing HTML
    .use(rehypePrismPlus, { 
      ignoreMissing: true,
      showLineNumbers: true 
    }) // Syntax highlighting
    .use(rehypeStringify, { allowDangerousHtml: true }) // Convert to HTML string
    .process(matterResult.content);
  let contentHtml = processedContent.toString();

  // replace the headings with the anchor links with h1-h6
  contentHtml = contentHtml.replace(/<h(\d)>(.*?)<\/h\d>/g, (match, p1, p2) => {
    const id = p2.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return `<h${p1} id="${id}">${p2}</h${p1}>`;
  });

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    content: matterResult.content,
    ...matterResult.data,
  };
}
