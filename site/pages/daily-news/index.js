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
  const pageTitle = `Daily News | ${DEFAULT_CONFIG.siteTitle}`;
  const latestSources = latestEdition?.newsSources || [];
  const visibleSources = latestSources.slice(0, 5);
  const hiddenSourceCount = Math.max(latestSources.length - visibleSources.length, 0);

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        {MetaData()}
      </Head>

      <section className={dailyNewsStyles.indexPage}>
        <div className={dailyNewsStyles.indexHero}>
          <div className={dailyNewsStyles.indexHeroHeader}>
            <span className={dailyNewsStyles.indexEyebrow}>Daily News</span>
            {latestEdition && (
              <span className={dailyNewsStyles.indexFreshness}>
                Updated <DateComponent dateString={latestEdition.date} />
              </span>
            )}
          </div>

          <div className={dailyNewsStyles.indexHeroBody}>
            <div className={dailyNewsStyles.indexHeroCopy}>
              <h1 className={dailyNewsStyles.indexTitle}>
                Global headlines, markets, builder chatter
              </h1>
              <p className={dailyNewsStyles.indexDescription}>
                A compact daily brief collected from public sources across major news outlets,
                market snapshots, Hacker News, and Product Hunt.
              </p>
            </div>

            <dl className={dailyNewsStyles.indexStats}>
              <div>
                <dt>Editions</dt>
                <dd>{allDailyNewsData.length}</dd>
              </div>
              {latestEdition && (
                <div>
                  <dt>Latest</dt>
                  <dd>
                    <DateComponent dateString={latestEdition.date} />
                  </dd>
                </div>
              )}
              {latestSources.length > 0 && (
                <div>
                  <dt>Sources</dt>
                  <dd>{latestSources.length}</dd>
                </div>
              )}
            </dl>
          </div>

          {visibleSources.length > 0 && (
            <div className={dailyNewsStyles.sourceRail} aria-label="Latest edition sources">
              {visibleSources.map((source) => (
                <span key={source}>{source}</span>
              ))}
              {hiddenSourceCount > 0 && <span>{hiddenSourceCount} more</span>}
            </div>
          )}
        </div>

        {latestEdition ? (
          <>
            <section className={dailyNewsStyles.latestEdition} aria-labelledby="latest-edition">
              <div className={dailyNewsStyles.latestLabel}>Latest Edition</div>
              <h2 className={dailyNewsStyles.latestTitle} id="latest-edition">
                <Link href={`/daily-news/${latestEdition.id}`}>{latestEdition.title}</Link>
              </h2>
              <p className={dailyNewsStyles.latestDescription}>{latestEdition.description}</p>
              <div className={dailyNewsStyles.latestMeta}>
                <span>
                  <DateComponent dateString={latestEdition.date} />
                </span>
                <span>{latestEdition.readingTime} min read</span>
                {latestEdition.marketSessionLabel && <span>{latestEdition.marketSessionLabel}</span>}
              </div>
            </section>

            <div className={dailyNewsStyles.archiveHeader}>
              <h2>Archive</h2>
              <span>{archiveEditions.length} older briefs</span>
            </div>
            <ul className={`${utilStyles.list} ${dailyNewsStyles.archiveGrid}`}>
              {archiveEditions.map(({ id, date, title, readingTime }) => (
                <li className={`${utilStyles.listItem} ${dailyNewsStyles.archiveCard}`} key={id}>
                  <Link className={dailyNewsStyles.archiveLink} href={`/daily-news/${id}`}>
                    {title}
                  </Link>
                  <div className={dailyNewsStyles.archiveMeta}>
                    <span>
                      <DateComponent dateString={date} />
                    </span>
                    <span>{readingTime} min read</span>
                  </div>
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
