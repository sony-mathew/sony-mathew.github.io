import styles from "./browser_privacy_note.module.scss";

export default function BrowserPrivacyNote({ compact = false }) {
  const className = compact
    ? `${styles.note} ${styles.compact}`
    : styles.note;

  return (
    <aside className={className} aria-label="Tool privacy">
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M4 7.5h16" />
          <path d="M7 4.5h.01M10 4.5h.01" />
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      </span>
      <span className={styles.copy}>
        <strong>Runs entirely in your browser.</strong>
        <span>
          Your inputs are processed locally and aren&apos;t sent to a backend
          or external API.
        </span>
      </span>
    </aside>
  );
}
