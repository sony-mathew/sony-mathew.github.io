import Link from "next/link";
import styles from "./layout.module.scss";

export default function SocialButtons() {
  return (
    <>
      <Link href="https://github.com/sony-mathew">
        <a target="_blank" title="Github">
          <img
            src="/icons/github.svg"
            className={`${styles.icon}`}
            alt="Github"
          />
        </a>
      </Link>
      <Link href="https://twitter.com/sonymathew_">
        <a target="_blank" title="Twitter">
          <img
            src="/icons/twitter.svg"
            className={`${styles.icon}`}
            alt="Twitter"
          />
        </a>
      </Link>
      <Link href="https://www.instagram.com/sonymathew_">
        <a target="_blank" title="Instagram">
          <img
            src="/icons/instagram.svg"
            className={`${styles.icon}`}
            alt="Instagram"
          />
        </a>
      </Link>
      <Link href="https://www.linkedin.com/in/sonymathew">
        <a target="_blank" title="LinkedIn">
          <img
            src="/icons/linkedin.svg"
            className={`${styles.icon}`}
            alt="LinkedIn"
          />
        </a>
      </Link>
      <Link href="/rss.xml">
        <a target="_blank" title="RSS">
          <img
            src="/icons/rss.svg"
            className={`${styles.icon}`}
            alt="RSS"
          />
        </a>
      </Link>
    </>
  );
}