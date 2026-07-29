import Head from "next/head";
import Link from "next/link";
import DEFAULT_CONFIG from "../config/default_config";
import Layout from "../components/layout";
import { MetaData } from "../components/meta_data";
import styles from "../styles/about.module.scss";

const interests = [
  "Technology",
  "Startups",
  "Philosophy",
  "Economics",
  "Open source",
  "Travel",
  "Entrepreneurship",
];

export default function AboutPage() {
  const pageTitle = `About | ${DEFAULT_CONFIG.siteTitle} by ${DEFAULT_CONFIG.author}`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        {MetaData()}
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>About me</span>
            <h1>
              Sony Mathew<span aria-hidden="true">.</span>
            </h1>
            <p>I&apos;m an engineer hailing from Kerala, India.</p>
          </div>
          <div className={styles.portraitFrame}>
            <img src="/images/sony.jpeg" alt="Illustration of Sony Mathew" />
          </div>
        </header>

        <div className={styles.storyGrid}>
          <section className={styles.story} aria-labelledby="story-title">
            <span className={styles.sectionEyebrow}>My story</span>
            <h2 id="story-title">
              Engineering, entrepreneurship, and open source.
            </h2>
            <div className={styles.prose}>
              <p>
                My entrepreneurial journey took flight when I co-founded
                Marketfox, which earned a spot in Y Combinator&apos;s W17
                batch.
              </p>
              <p>
                After an enriching stint at{" "}
                <Link href="https://www.freshworks.com/" target="_blank">
                  Freshworks
                </Link>{" "}
                during its early days, where I gained deep insights into
                building SaaS businesses, I channeled that experience into
                pursuing my own entrepreneurial ventures.
              </p>
              <p>
                Now, as Head of Engineering at{" "}
                <Link href="https://www.chatwoot.com" target="_blank">
                  Chatwoot
                </Link>
                , I continue to explore the fascinating world of technology
                while pursuing my diverse interests in startups, philosophy,
                economics, and open-source development. I&apos;m particularly
                passionate about contributing to the{" "}
                <Link href="https://github.com/sony-mathew" target="_blank">
                  open-source
                </Link>{" "}
                community and sharing my experiences in technology, leadership,
                and entrepreneurship.
              </p>
            </div>
          </section>

          <aside className={styles.snapshot} aria-label="At a glance">
            <span className={styles.snapshotLabel}>At a glance</span>
            <dl>
              <div>
                <dt>Based in</dt>
                <dd>Kerala, India</dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>Head of Engineering at Chatwoot</dd>
              </div>
              <div>
                <dt>Co-founded</dt>
                <dd>Marketfox · Y Combinator W17</dd>
              </div>
              <div>
                <dt>Previously</dt>
                <dd>Freshworks · Postman · Furlenco · BigBinary</dd>
              </div>
            </dl>
          </aside>
        </div>

        <section className={styles.interests} aria-labelledby="interests-title">
          <div>
            <span className={styles.sectionEyebrow}>Curiosities</span>
            <h2 id="interests-title">Things I keep coming back to.</h2>
          </div>
          <ul>
            {interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </section>

      </article>
    </Layout>
  );
}
