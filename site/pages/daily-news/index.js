import Head from "next/head";
import Link from "next/link";
import DEFAULT_CONFIG from "../../config/default_config";
import Layout from "../../components/layout";
import DateComponent from "../../components/date";
import { MetaData } from "../../components/meta_data";
import { getSortedDailyNewsData } from "../../lib/daily_news";
import utilStyles from "../../styles/utils.module.scss";
import dailyNewsStyles from "../../styles/daily-news.module.scss";

export async function getStaticProps() {
  const allDailyNewsData = getSortedDailyNewsData();

  return {
    props: {
      allDailyNewsData,
    },
  };
}

export default function DailyNewsIndex({ allDailyNewsData }) {
  const [latestEdition, ...archiveEditions] = allDailyNewsData;

  return (
    <Layout>
      <Head>
        <title>Daily News | {DEFAULT_CONFIG.siteTitle}</title>
        {MetaData()}
      </Head>

      <section>
        <div className={dailyNewsStyles.indexHero}>
          <div className={utilStyles.lightText}>Daily News</div>
          <h2 className={utilStyles.heading2Xl}>Global headlines, markets, builder chatter</h2>
          <p>
            A compact daily brief collected from public sources across major news outlets, market
            snapshots, Hacker News, and Product Hunt.
          </p>
          <small className={utilStyles.lightText}>{allDailyNewsData.length} published editions</small>
        </div>

        {latestEdition ? (
          <>
            <div className={utilStyles.archiveCallout}>
              <div className={utilStyles.archiveLabel}>Latest Edition</div>
              <h3 className={utilStyles.headingLg}>
                <Link href={`/daily-news/${latestEdition.id}`}>{latestEdition.title}</Link>
              </h3>
              <p>{latestEdition.description}</p>
              <small className={utilStyles.lightText}>
                <DateComponent dateString={latestEdition.date} /> • {latestEdition.readingTime} min read
              </small>
            </div>

            <h3 className={utilStyles.headingMd}>Archive</h3>
            <ul className={`${utilStyles.list} ${dailyNewsStyles.archiveGrid}`}>
              {archiveEditions.map(({ id, date, title, readingTime }) => (
                <li className={`${utilStyles.listItem} ${dailyNewsStyles.archiveCard}`} key={id}>
                  <Link href={`/daily-news/${id}`}>{title}</Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <DateComponent dateString={date} /> • {readingTime} min read
                  </small>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No Daily News editions yet. Run the generator to create the first one.</p>
        )}
      </section>
    </Layout>
  );
}
