import fs from "fs";
import Head from "next/head";
import Link from "next/link";
import DEFAULT_CONFIG from '../config/default_config';
import { projectsList } from "../config/projectsList";
import { getSortedPostsData } from "../lib/posts";
import generateRss from '../lib/rss';
import generateSitemap from '../lib/sitemap';
import Layout from "../components/layout";
import DateComponent from "../components/date";
import { MetaData } from "../components/meta_data";
import utilStyles from "../styles/utils.module.scss";
import styles from "../styles/blog.module.scss";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const rss = generateRss(allPostsData);
  const sitemap = generateSitemap(allPostsData, projectsList);

  fs.writeFileSync('./public/rss.xml', rss);
  fs.writeFileSync('./public/sitemap.xml', sitemap);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const pageTitle = `Blog | ${DEFAULT_CONFIG.siteTitle} by ${DEFAULT_CONFIG.author}`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        { MetaData() }
      </Head>
      <section aria-labelledby="blog-archive-title">
        <header className={styles.archiveHeader}>
          <span className={styles.eyebrow}>Writing archive</span>
          <div className={styles.titleRow}>
            <h1 id="blog-archive-title" className={styles.title}>
              Ramblings<span aria-hidden="true">.</span>
            </h1>
            <span className={styles.postCount}>
              {allPostsData.length} published notes
            </span>
          </div>
        </header>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, readingTime }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/blog/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent dateString={date} /> • {readingTime} min read
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
