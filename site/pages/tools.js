import Head from "next/head";
import Link from "next/link";
import DEFAULT_CONFIG from "../config/default_config";
import Layout from "../components/layout";
import DateComponent from "../components/date";
import { MetaData } from "../components/meta_data";
import { projectsList } from "../config/projectsList";
import BrowserPrivacyNote from "../components/browser_privacy_note";
import { getToolPresentation, ToolIcon } from "../components/tool_identity";
import styles from "../styles/tools.module.scss";

export default function ToolsPage() {
  const pageTitle = `Simple Tools | ${DEFAULT_CONFIG.siteTitle} by ${DEFAULT_CONFIG.author}`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        { MetaData() }
      </Head>
      <section className={styles.page} aria-labelledby="tools-page-title">
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Browser toolbox</span>
            <h1 id="tools-page-title" className={styles.title}>
              Simple tools, <span>ready to use.</span>
            </h1>
            <p className={styles.introduction}>
              A growing set of small utilities for text, calculations, focus,
              and everyday work.
            </p>
          </div>
          <div className={styles.toolCount} aria-label={`${projectsList.length} tools available`}>
            <strong>{String(projectsList.length).padStart(2, "0")}</strong>
            <span>tools available</span>
          </div>
        </header>

        <BrowserPrivacyNote />

        <ul className={styles.toolGrid}>
          {projectsList.map(({ id, date, description, title }) => {
            const presentation = getToolPresentation(id, { description, title });

            return (
              <li
                className={styles.toolItem}
                data-accent={presentation.accent}
                key={id}
              >
                <Link className={styles.toolCard} href={`/tools/${id}`}>
                  <div className={styles.cardTop}>
                    <span className={styles.icon}>
                      <ToolIcon id={id} />
                    </span>
                    <span className={styles.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </div>

                  <div className={styles.cardContent}>
                    <span className={styles.category}>{presentation.category}</span>
                    <h2 className={styles.cardTitle}>{presentation.title}</h2>
                    <p className={styles.description}>{presentation.description}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.openLabel}>Open tool</span>
                    <span className={styles.date}>
                      <DateComponent dateString={date} />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
