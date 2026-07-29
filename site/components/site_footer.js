import Link from "next/link";
import SocialButtons from "./social_buttons";
import styles from "./site_footer.module.scss";

export default function SiteFooter() {
  return (
    <div className={styles.footerShell}>
      <div className={styles.footerMeta}>
        <span className={styles.buildNote}>
          Built with Next.js and hosted on GitHub Pages.
        </span>
        <div className={styles.footerActions}>
          <Link
            href="/sitemap.xml"
            className={styles.sitemapLink}
            target="_blank"
          >
            Sitemap
          </Link>
          <div className={styles.socialLinks} aria-label="Find me online">
            <SocialButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
