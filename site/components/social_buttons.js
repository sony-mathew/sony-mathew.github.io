import Link from "next/link";
import styles from "./layout.module.scss";

export default function SocialButtons() {
  return (
    <>
      <Link href="https://github.com/sony-mathew" target="_blank" title="Github">
        <img
          src="/icons/github.svg"
          className={`${styles.icon}`}
          alt="Github"
        />
      </Link>
      <Link href="https://twitter.com/sonymathew_" target="_blank" title="Twitter">
        <img
          src="/icons/twitter.svg"
          className={`${styles.icon}`}
          alt="Twitter"
        />
      </Link>
      <Link href="https://www.instagram.com/sonymathew_" target="_blank" title="Instagram">
        <img
          src="/icons/instagram.svg"
          className={`${styles.icon}`}
          alt="Instagram"
        />
      </Link>
      <Link href="https://www.linkedin.com/in/sonymathew" target="_blank" title="LinkedIn">
        <img
          src="/icons/linkedin.svg"
          className={`${styles.icon}`}
          alt="LinkedIn"
        />
      </Link>
      <Link href="/rss.xml" target="_blank" title="RSS">
        <img
          src="/icons/rss.svg"
          className={`${styles.icon}`}
          alt="RSS"
        />
      </Link>
    </>
  );
}