import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import DEFAULT_CONFIG from "../../config/default_config";
import Layout from "../../components/layout";
import DateComponent from "../../components/date";
import { MetaData } from "../../components/meta_data";
import { getSortedDailyNewsData } from "../../lib/daily_news";
import { paginateItems } from "../../lib/pagination";
import dailyNewsStyles from "../../styles/daily-news.module.scss";

const ARCHIVE_PAGE_SIZE = 12;
const FEATURED_SOURCES = [
  "Washington Post",
  "Al Jazeera",
  "NPR",
  "The Hindu",
  "Reuters",
  "China Daily",
  "Hacker News",
  "Product Hunt",
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [latestEdition, ...archiveEditions] = allDailyNewsData;
  const pageTitle = `Daily News Briefs | ${DEFAULT_CONFIG.siteTitle}`;
  const latestSources = latestEdition?.newsSources || FEATURED_SOURCES;

  // Client-side search filtering across archive editions
  const filteredArchiveEditions = useMemo(() => {
    if (!searchQuery.trim()) {
      return archiveEditions;
    }
    const query = searchQuery.toLowerCase().trim();
    return archiveEditions.filter(
      (item) =>
        item.title?.toLowerCase().includes(query) ||
        item.date?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
    );
  }, [archiveEditions, searchQuery]);

  const archivePagination = paginateItems(
    filteredArchiveEditions,
    requestedArchivePage,
    ARCHIVE_PAGE_SIZE
  );

  useEffect(() => {
    const syncPageFromUrl = () => {
      const pageFromUrl = new URLSearchParams(window.location.search).get("page");
      setRequestedArchivePage(
        paginateItems(filteredArchiveEditions, pageFromUrl, ARCHIVE_PAGE_SIZE).currentPage
      );
    };

    syncPageFromUrl();
    window.addEventListener("popstate", syncPageFromUrl);

    return () => window.removeEventListener("popstate", syncPageFromUrl);
  }, [filteredArchiveEditions]);

  const changeArchivePage = (page) => {
    const nextPage = paginateItems(filteredArchiveEditions, page, ARCHIVE_PAGE_SIZE).currentPage;

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setRequestedArchivePage(1);
  };

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        {MetaData()}
      </Head>

      <section className={dailyNewsStyles.indexPage}>
        {/* Main Hero Header */}
        <div className={dailyNewsStyles.indexHero}>
          <div className={dailyNewsStyles.indexHeroHeader}>
            <div className={dailyNewsStyles.indexEyebrow}>
              <span className={dailyNewsStyles.livePulse} aria-hidden="true" />
              <span>LIVE BRIEFING</span>
            </div>
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
                An automated daily intelligence digest aggregating world headlines, market index
                snapshots, Hacker News discussions, and Product Hunt launches.
              </p>
            </div>

            <dl className={dailyNewsStyles.indexStats}>
              <div>
                <dt>Editions</dt>
                <dd>{allDailyNewsData.length}</dd>
              </div>
              <div>
                <dt>Sources</dt>
                <dd>{FEATURED_SOURCES.length}</dd>
              </div>
            </dl>
          </div>

          <div className={dailyNewsStyles.sourceRail} aria-label="Monitored news sources">
            {latestSources.map((source) => (
              <span className={dailyNewsStyles.sourcePill} key={source}>
                {source}
              </span>
            ))}
          </div>
        </div>

        {latestEdition ? (
          <>
            {/* Featured Latest Edition Section */}
            <section className={dailyNewsStyles.latestEdition} aria-labelledby="latest-edition-heading">
              <div className={dailyNewsStyles.latestEditionBody}>
                {latestEdition.archiveThumbnailUrl ? (
                  <img
                    className={dailyNewsStyles.latestThumbnail}
                    src={latestEdition.archiveThumbnailUrl}
                    alt=""
                  />
                ) : (
                  <div
                    className={dailyNewsStyles.latestThumbnail}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(15, 23, 42, 0.05) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--brand-color)",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    LATEST EDITION
                  </div>
                )}
                <div className={dailyNewsStyles.latestEditionCopy}>
                  <div className={dailyNewsStyles.latestLabel}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ display: "inline-block" }}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>Featured Today</span>
                  </div>
                  <h2 className={dailyNewsStyles.latestTitle} id="latest-edition-heading">
                    <Link href={`/daily-news/${latestEdition.id}`}>{latestEdition.title}</Link>
                  </h2>
                  <div className={dailyNewsStyles.descriptionWrapper}>
                    <p className={dailyNewsStyles.latestDescription}>{latestEdition.description}</p>
                    <div className={dailyNewsStyles.fadeOverlay} aria-hidden="true" />
                  </div>
                  <div className={dailyNewsStyles.latestFooter}>
                    <div className={dailyNewsStyles.latestMeta}>
                      <span className={dailyNewsStyles.metaBadge}>
                        <DateComponent dateString={latestEdition.date} />
                      </span>
                      <span className={dailyNewsStyles.metaBadge}>
                        {latestEdition.readingTime} min read
                      </span>
                      {latestEdition.marketSessionLabel && (
                        <span className={dailyNewsStyles.metaBadge}>
                          {latestEdition.marketSessionLabel}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/daily-news/${latestEdition.id}`}
                      className={dailyNewsStyles.readMoreButton}
                    >
                      Read Briefing →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Archive Section with Filter & Grid */}
            <div className={dailyNewsStyles.archiveSection}>
              <div className={dailyNewsStyles.archiveHeader} id="daily-news-archive">
                <div className={dailyNewsStyles.archiveHeaderLeft}>
                  <h2>Edition Archive</h2>
                  <span className={dailyNewsStyles.archiveHeaderCount}>
                    {filteredArchiveEditions.length} brief{filteredArchiveEditions.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className={dailyNewsStyles.searchWrapper}>
                  <svg
                    className={dailyNewsStyles.searchIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    className={dailyNewsStyles.searchInput}
                    placeholder="Search by date or keyword..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              {archivePagination.items.length > 0 ? (
                <ul className={dailyNewsStyles.archiveGrid}>
                  {archivePagination.items.map(
                    ({ id, date, title, readingTime, archiveThumbnailUrl, description }) => (
                      <li className={dailyNewsStyles.archiveCard} key={id}>
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
              ) : (
                <p style={{ color: "var(--secondary-text-color)", textAlign: "center", padding: "2rem 0" }}>
                  No editions found matching &ldquo;{searchQuery}&rdquo;.
                </p>
              )}

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
            </div>
          </>
        ) : (
          <p>No Daily News editions yet. Run the generator to create the first one.</p>
        )}
      </section>
    </Layout>
  );
}
