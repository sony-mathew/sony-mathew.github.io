import Head from "next/head";
import Link from "next/link";
import DEFAULT_CONFIG from "../config/default_config";
import { getSortedPostsData } from "../lib/posts";
import SubscribeNewsletter from "../lib/subscribe_newsletter";
import Layout from "../components/layout";
import Date from "../components/date";
import { MetaData } from "../components/meta_data";
import styles from "../styles/home.module.scss";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const exploreLinks = [
  {
    href: "/blog",
    number: "01",
    label: "Writing",
    description:
      "Essays and notes on engineering, leadership, travel, and ideas that stay with me.",
    linkLabel: "Read the blog",
    accent: "writingCard",
  },
  {
    href: "/tools",
    number: "02",
    label: "Tools",
    description:
      "Small, focused utilities that work entirely in your browser.",
    linkLabel: "Browse the tools",
    accent: "toolsCard",
  },
  {
    href: "/daily-news",
    number: "03",
    label: "Daily news",
    description:
      "A compact daily briefing across world news, markets, and technology.",
    linkLabel: "Open today’s briefing",
    accent: "newsCard",
  },
];

export default function Home({ allPostsData }) {
  const pageTitle = `${DEFAULT_CONFIG.siteTitle} by ${DEFAULT_CONFIG.author}`;
  const latestPost = allPostsData[0];

  return (
    <Layout home>
      <Head>
        <title>{pageTitle}</title>
        {MetaData()}
      </Head>

      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>The Usual Ramblings</span>
            <h1 id="home-title" className={styles.heroTitle}>
              A notebook for things I&apos;m learning and building.
            </h1>
            <p className={styles.heroDescription}>
              Essays on technology, career, travel, and philosophy—alongside
              useful browser tools and a daily view of the news.
            </p>
            <div className={styles.heroActions}>
              {latestPost && (
                <Link
                  href={`/blog/${latestPost.id}`}
                  className={styles.primaryAction}
                >
                  Read the latest note
                  <span aria-hidden="true">→</span>
                </Link>
              )}
              <Link href="/about" className={styles.secondaryAction}>
                About me
              </Link>
            </div>
          </div>

          <Link
            href="/about"
            className={styles.profileCard}
            aria-label="Learn more about Sony Mathew"
          >
            <span className={styles.profileImageFrame}>
              <img
                src="/images/sony.jpeg"
                className={styles.profileImage}
                alt=""
              />
            </span>
            <span className={styles.profileEyebrow}>Written and built by</span>
            <strong>Sony Mathew</strong>
            <span className={styles.profileRole}>
              Engineer · Builder · Open source
            </span>
            <span className={styles.profileLink}>
              More about me <span aria-hidden="true">→</span>
            </span>
          </Link>
        </section>

        <section className={styles.exploreSection} aria-labelledby="explore-title">
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionEyebrow}>Explore</span>
              <h2 id="explore-title">Choose your rabbit hole.</h2>
            </div>
            <p>Writing, practical utilities, and a daily briefing.</p>
          </div>

          <div className={styles.exploreGrid}>
            {exploreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={`${item.label}: ${item.linkLabel}`}
                className={`${styles.exploreCard} ${styles[item.accent]}`}
              >
                <span className={styles.cardNumber} aria-hidden="true">
                  {item.number}
                </span>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
                <span className={styles.cardLink}>
                  {item.linkLabel}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.latestSection} aria-labelledby="latest-title">
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionEyebrow}>Latest writing</span>
              <h2 id="latest-title">Recent Ramblings.</h2>
            </div>
            <Link href="/blog" className={styles.archiveLink}>
              View the archive <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.postList}>
            {allPostsData.slice(0, 4).map(
              ({ id, date, title, readingTime }) => (
                <Link
                  href={`/blog/${id}`}
                  className={styles.postRow}
                  key={id}
                >
                  <span className={styles.postDate}>
                    <Date dateString={date} />
                  </span>
                  <span className={styles.postTitle}>{title}</span>
                  <span className={styles.postMeta}>
                    {readingTime} min read
                    <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              )
            )}
          </div>
        </section>

        <SubscribeNewsletter />
      </div>
    </Layout>
  );
}
