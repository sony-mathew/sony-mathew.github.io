import Link from "next/link";
import BrowserPrivacyNote from "./browser_privacy_note";
import { getToolPresentation, ToolIcon } from "./tool_identity";
import styles from "./tool_page_header.module.scss";

export default function ToolPageHeader({ id, title, description }) {
  const presentation = getToolPresentation(id, { title, description });

  return (
    <header className={styles.header} data-accent={presentation.accent}>
      <Link className={styles.backLink} href="/tools">
        <span aria-hidden="true">←</span>
        All tools
      </Link>

      <div className={styles.identity}>
        <span className={styles.icon}>
          <ToolIcon id={id} />
        </span>
        <div className={styles.heading}>
          <span className={styles.category}>{presentation.category}</span>
          <h1 className={styles.title}>{presentation.title}</h1>
        </div>
      </div>

      <p className={styles.description}>{presentation.description}</p>
      <BrowserPrivacyNote compact />
    </header>
  );
}
