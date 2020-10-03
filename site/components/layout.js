import Head from "next/head";
import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";

export const siteTitle = "The Usual Ramblings";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Portfolio Website and Personal Blog of Sony Mathew"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <div className="grid grid-cols-6 flex-row mb-8">
          <div className="col-start-1 col-span-2 flex flex-grow text-gray-700 text-center px-4 py-2 m-2 pl-0">
            <Link href="/">
              <a className="p-2 text-gray-600 hover:no-underline">
                The Usual 🎙
              </a>
            </Link>
          </div>
          <div className="col-start-3 col-span-2 flex flex-row gap-4 text-center px-4 py-2 m-2">
            <Link href="/blog">
              <a className="p-2 text-gray-600 hover:no-underline">Blog</a>
            </Link>
            <Link href="/projects">
              <a className="p-2 text-gray-600 hover:no-underline">Projects</a>
            </Link>
          </div>
          <div className="col-span-1 flex flex-row gap-4 text-right px-4 py-2 m-2"></div>
          <div className="col-span-1 col-end-6 flex flex-row gap-4 items-end place-items-end text-right px-4 py-2 m-2">
            <Link href="https://github.com/sony-mathew">
              <a target="_blank" class="py-2">
                <img
                  src="/icons/github.svg"
                  className={`${styles.icon}`}
                  alt="Github"
                />
              </a>
            </Link>
            <Link href="https://twitter.com/sonymathew_">
              <a target="_blank" class="py-2">
                <img
                  src="/icons/twitter.svg"
                  className={`${styles.icon}`}
                  alt="Twitter"
                />
              </a>
            </Link>
            <Link href="https://www.linkedin.com/in/sonymathew/">
              <a target="_blank" class="py-2">
                <img
                  src="/icons/linkedin.svg"
                  className={`${styles.icon}`}
                  alt="LinkedIn"
                />
              </a>
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
