import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { ArticleMeta } from "../../components/meta_data";
import DateComponent from "../../components/date";
import Tags from "../../components/tags";
import {
  DailyNewsPayloadRenderer,
  formatRelativeTimeLabel,
} from "../../components/daily_news_renderer";
import dailyNewsStyles from "../../styles/daily-news.module.scss";
import { getAllDailyNewsIds, getDailyNewsData } from "../../lib/daily_news";

const NAV_SECTIONS = [
  { id: "global-headlines", label: "Global Headlines" },
  { id: "market-snapshot", label: "Market Snapshot" },
  { id: "hacker-news", label: "Hacker News" },
  { id: "product-hunt", label: "Product Hunt" },
  { id: "source-notes", label: "Source Notes" },
];

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
  const [activeSection, setActiveSection] = useState(NAV_SECTIONS[0].id);
  const summarySections = editionData.dailyNewsPayload?.summarySections || [];

  // Update relative timestamps client-side
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

  // Track active section on scroll for sticky nav
  useEffect(() => {
    const sectionElements = NAV_SECTIONS.map((sec) => document.getElementById(sec.id)).filter(
      Boolean
    );

    if (sectionElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [editionData.id]);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(targetId);
    }
  };

  return (
    <Layout>
      <Head>{ArticleMeta({ article: editionData })}</Head>
      <article className={dailyNewsStyles.page}>
        {/* Article Hero */}
        <section className={dailyNewsStyles.hero}>
          <div className={dailyNewsStyles.heroHeader}>
            <div className={dailyNewsStyles.heroBadgeGroup}>
              <span className={dailyNewsStyles.heroLabel}>
                <span className={dailyNewsStyles.livePulse} aria-hidden="true" />
                <span>Daily News Edition</span>
              </span>
            </div>
            <Link
              href="/daily-news"
              style={{
                fontSize: "0.8125rem",
                color: "var(--news-accent)",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              ← Back to Archive
            </Link>
          </div>

          <h1 className={dailyNewsStyles.heroTitle}>{editionData.title}</h1>

          {summarySections.length > 0 ? (
            <div className={dailyNewsStyles.summarySections}>
              {summarySections.map((section) => (
                <section className={dailyNewsStyles.summarySection} key={section.title}>
                  <h2 className={dailyNewsStyles.summaryTitle}>{section.title}</h2>
                  <ul className={dailyNewsStyles.summaryList}>
                    {section.sentences.map((sentence) => (
                      <li key={sentence}>{sentence}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <p className={dailyNewsStyles.heroDescription}>{editionData.description}</p>
          )}

          <div className={dailyNewsStyles.metaRow}>
            <span className={dailyNewsStyles.metaBadge}>
              📅 <DateComponent dateString={editionData.date} />
            </span>
            <span className={dailyNewsStyles.metaBadge}>⏱ {editionData.readingTime} min read</span>
            <span className={dailyNewsStyles.metaBadge}>✍️ {editionData.author}</span>
            {editionData.marketSessionLabel && (
              <span className={dailyNewsStyles.metaBadge}>
                📈 {editionData.marketSessionLabel}
              </span>
            )}
          </div>
        </section>

        {/* Sticky Section Quick Navigation */}
        <div className={dailyNewsStyles.stickyNavWrapper}>
          <nav className={dailyNewsStyles.stickyNav} aria-label="Section navigation">
            {NAV_SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  className={`${dailyNewsStyles.navPill} ${
                    isActive ? dailyNewsStyles.navPillActive : ""
                  }`}
                >
                  {section.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Banner Cover Image */}
        {editionData.bannerImage && (
          <div
            style={{
              overflow: "hidden",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
            }}
          >
            <img
              src={editionData.bannerImage}
              alt="Edition Banner"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}

        {/* Article Body Content */}
        <div ref={contentRef} className={dailyNewsStyles.content}>
          {editionData.dailyNewsPayload ? (
            <DailyNewsPayloadRenderer payload={editionData.dailyNewsPayload} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: editionData.contentHtml }} />
          )}
        </div>

        {/* Article Tags */}
        <Tags tags={editionData.tags} />
      </article>
    </Layout>
  );
}
