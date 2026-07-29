import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import DEFAULT_CONFIG from "../../config/default_config";
import Layout from "../../components/layout";
import DateComponent from "../../components/date";
import { MetaData } from "../../components/meta_data";
import { getSortedDailyNewsData } from "../../lib/daily_news";
import { paginateItems } from "../../lib/pagination";
import utilStyles from "../../styles/utils.module.scss";
import dailyNewsStyles from "../../styles/daily-news.module.scss";

const ARCHIVE_PAGE_SIZE = 30;
const DAILY_NEWS_SOURCE_COUNT = 8;

export async function getStaticProps() {
  const allDailyNewsData = getSortedDailyNewsData();

  return {
    props: {
      allDailyNewsData,
    },
  };
}

export default function DailyNewsIndex({ allDailyNewsData }) {
  const [requestedArchivePage, setRequestedArchivePage] = useState(1);
  const [latestEdition, ...archiveEditions] = allDailyNewsData;
  const pageTitle = `Daily News | ${DEFAULT_CONFIG.siteTitle}`;
  const latestSources = latestEdition?.newsSources || [];
  const visibleSources = latestSources.slice(0, 5);
  const hiddenSourceCount = Math.max(latestSources.length - visibleSources.length, 0);
  const archivePagination = paginateItems(
    archiveEditions,
    requestedArchivePage,
    ARCHIVE_PAGE_SIZE
  );

  useEffect(() => {
    const syncPageFromUrl = () => {
      const pageFromUrl = new URLSearchParams(window.location.search).get("page");
      setRequestedArchivePage(
        paginateItems(archiveEditions, pageFromUrl, ARCHIVE_PAGE_SIZE).currentPage
      );
    };

    syncPageFromUrl();
    window.addEventListener("popstate", syncPageFromUrl);

    return () => window.removeEventListener("popstate", syncPageFromUrl);
  }, [archiveEditions.length]);

  const changeArchivePage = (page) => {
    const nextPage = paginateItems(archiveEditions, page, ARCHIVE_PAGE_SIZE).currentPage;

    if (nextPage === archivePagination.currentPage) {
      return;
    }

    setRequestedArchivePage(nextPage);

    const nextUrl = new URL(window.location.href);
    if (nextPage === 1) {
      nextUrl.searchParams.delete("page");
    } else {
      nextUrl.searchParams.set("page", String(nextPage));
    }
    window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    document
      .getElementById("daily-news-archive")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
              <h1 className={dailyNewsStyles.indexTitle}>Automated Daily News Brief</h1>
              <p className={dailyNewsStyles.indexDescription}>
                A fully automated news brief gathered from public sources across major news
                outlets, market snapshots, Hacker News, and Product Hunt.
              </p>
            </div>

            <dl className={dailyNewsStyles.indexStats}>
              <div>
                <dt>Editions</dt>
                <dd>{allDailyNewsData.length}</dd>
              </div>
              {latestSources.length > 0 && (
                <div>
                  <dt>Sources</dt>
                  <dd>{DAILY_NEWS_SOURCE_COUNT}</dd>
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
              <div className={dailyNewsStyles.latestEditionBody}>
                {latestEdition.archiveThumbnailUrl && (
                  <img
                    className={dailyNewsStyles.latestThumbnail}
                    src={latestEdition.archiveThumbnailUrl}
                    alt=""
                  />
                )}
                <div className={dailyNewsStyles.latestEditionCopy}>
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
                    {latestEdition.marketSessionLabel && (
                      <span>{latestEdition.marketSessionLabel}</span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className={dailyNewsStyles.archiveHeader} id="daily-news-archive">
              <h2>Archive</h2>
              <span>{archiveEditions.length} older briefs</span>
            </div>
            <ul className={`${utilStyles.list} ${dailyNewsStyles.archiveGrid}`}>
              {archivePagination.items.map(
                ({ id, date, title, readingTime, archiveThumbnailUrl }) => (
                  <li className={`${utilStyles.listItem} ${dailyNewsStyles.archiveCard}`} key={id}>
                    <div className={dailyNewsStyles.archiveCardBody}>
                      {archiveThumbnailUrl && (
                        <img
                          className={dailyNewsStyles.archiveThumbnail}
                          src={archiveThumbnailUrl}
                          alt=""
                          loading="lazy"
                        />
                      )}
                      <div className={dailyNewsStyles.archiveCardCopy}>
                        <Link className={dailyNewsStyles.archiveLink} href={`/daily-news/${id}`}>
                          {title}
                        </Link>
                        <div className={dailyNewsStyles.archiveMeta}>
                          <span>
                            <DateComponent dateString={date} />
                          </span>
                          <span>{readingTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
            {archivePagination.totalPages > 1 && (
              <nav
                className={dailyNewsStyles.archivePagination}
                aria-label="Daily news archive pages"
              >
                <button
                  className={`${dailyNewsStyles.paginationButton} ${dailyNewsStyles.paginationStep}`}
                  type="button"
                  disabled={archivePagination.currentPage === 1}
                  onClick={() => changeArchivePage(archivePagination.currentPage - 1)}
                >
                  Previous
                </button>
                {Array.from({ length: archivePagination.totalPages }, (_, index) => {
                  const page = index + 1;
                  const isCurrentPage = page === archivePagination.currentPage;

                  return (
                    <button
                      className={`${dailyNewsStyles.paginationButton} ${
                        isCurrentPage ? dailyNewsStyles.paginationButtonCurrent : ""
                      }`}
                      type="button"
                      aria-current={isCurrentPage ? "page" : undefined}
                      aria-label={`Page ${page}`}
                      key={page}
                      onClick={() => changeArchivePage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  className={`${dailyNewsStyles.paginationButton} ${dailyNewsStyles.paginationStep}`}
                  type="button"
                  disabled={archivePagination.currentPage === archivePagination.totalPages}
                  onClick={() => changeArchivePage(archivePagination.currentPage + 1)}
                >
                  Next
                </button>
              </nav>
            )}
          </>
        ) : (
          <p>No Daily News editions yet. Run the generator to create the first one.</p>
        )}
      </section>
    </Layout>
  );
}
