import { useEffect, useRef } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { ArticleMeta } from "../../components/meta_data";
import DateComponent from "../../components/date";
import Tags from "../../components/tags";
import {
  DailyNewsPayloadRenderer,
  formatRelativeTimeLabel,
} from "../../components/daily_news_renderer";
import utilStyles from "../../styles/utils.module.scss";
import dailyNewsStyles from "../../styles/daily-news.module.scss";
import { getAllDailyNewsIds, getDailyNewsData } from "../../lib/daily_news";

export async function getStaticPaths() {
  const paths = getAllDailyNewsIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const editionData = await getDailyNewsData(params.id);

  return {
    props: {
      editionData,
    },
  };
}

export default function DailyNewsEdition({ editionData }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const root = contentRef.current;

    if (!root) {
      return undefined;
    }

    const updateRelativeTimes = () => {
      const relativeTimes = root.querySelectorAll("time[data-relative-time]");

      relativeTimes.forEach((node) => {
        const isoValue = node.getAttribute("datetime");
        const granularity = node.getAttribute("data-relative-time-granularity") || "datetime";

        if (!isoValue) {
          return;
        }

        const relativeLabel = formatRelativeTimeLabel(isoValue, new Date(), granularity);

        if (relativeLabel) {
          node.textContent = relativeLabel;
        }
      });
    };

    updateRelativeTimes();
    const intervalId = window.setInterval(updateRelativeTimes, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, [editionData.id]);

  return (
    <Layout>
      <Head>{ArticleMeta({ article: editionData })}</Head>
      <article className={dailyNewsStyles.page}>
        <section className={dailyNewsStyles.hero}>
          <div className={dailyNewsStyles.heroLabel}>Daily News Edition</div>
          <h1 className={dailyNewsStyles.heroTitle}>{editionData.title}</h1>
          <p className={dailyNewsStyles.heroDescription}>{editionData.description}</p>
          <div className={dailyNewsStyles.metaRow}>
            <span className={dailyNewsStyles.metaBadge}>
              <DateComponent dateString={editionData.date} />
            </span>
            <span className={dailyNewsStyles.metaBadge}>{editionData.readingTime} min read</span>
            <span className={dailyNewsStyles.metaBadge}>{editionData.author}</span>
            {editionData.marketSessionLabel && (
              <span className={dailyNewsStyles.metaBadge}>{editionData.marketSessionLabel}</span>
            )}
          </div>
        </section>

        <div className={utilStyles.lightText}>
          <div>Edition: {editionData.editionDate || editionData.date}</div>
        </div>
        <br />
        {editionData.bannerImage && (
          <div
            style={{
              position: "relative",
              left: "50%",
              right: "50%",
              marginLeft: "-50vw",
              marginRight: "-50vw",
              width: "100vw",
              overflow: "hidden",
            }}
          >
            <img
              src={editionData.bannerImage}
              alt="Banner"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}

        <div ref={contentRef} className={dailyNewsStyles.content}>
          {editionData.dailyNewsPayload ? (
            <DailyNewsPayloadRenderer payload={editionData.dailyNewsPayload} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: editionData.contentHtml }} />
          )}
        </div>

        <Tags tags={editionData.tags} />
      </article>
    </Layout>
  );
}
