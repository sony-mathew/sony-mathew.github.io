import Head from "next/head";
import styles from "./layout.module.scss";
import Link from "next/link";
import DEFAULT_CONFIG from '../config/default_config'
import { useState } from 'react';

function DesktopLayout() {
  return (
    <>
      {/* For Desktop */}
      <div className="flex flex-row mb-10">
        <div className="flex-none text-gray-700 pl-0">
          <Link href="/">
            <a className="text-lg text-gray-600 hover:no-underline">
              The Usual 🎙
            </a>
          </Link>
        </div>
        <div className="flex flex-grow justify-center gap-x-4">
          <Link href="/blog">
            <a className="nav-item text-lg text-gray-600 hover:no-underline px-2 pb-1">Blog</a>
          </Link>
          <Link href="/projects">
            <a className="nav-item text-lg text-gray-600 hover:no-underline px-2 pb-1">
              Projects
            </a>
          </Link>
        </div>
        <div className="flex flex-row-reverse gap-x-4 mt-2">
          <SocialButtons />
        </div>
      </div>
    </>
  )
}

function MobileLayout() {
  const [navMenuOpened, setNavMenuOpened] = useState(false);

  return (
    <>
      {/* For Mobile */}
      <MobileNavMenuSidebar navMenuOpened={navMenuOpened} setNavMenuOpened={setNavMenuOpened} />

      <ul className="inline-flex m-0">
        <li>
          <button className="py-2 text-gray-600 appearance-none focus:outline-none" onClick={() => setNavMenuOpened(true)}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </li>
        <li className="mx-4">
          <Link href="/">
            <a className="text-lg text-gray-600 hover:no-underline py-1">
              The Usual 🎙
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
}

function MobileNavMenuSidebar({ navMenuOpened, setNavMenuOpened }) {
  if (!navMenuOpened) {
    return null;
  }

  return (
    <div className="w-full absolute top-0 left-0 z-10 m-0 bg-gray-700">
      <div className="absolute top-0 right-0 m-4" onClick={() => setNavMenuOpened(false)}>Close</div>
      <div className="flex flex-col m-4 gap-4">
        <Link href="/">
          <a className="text-lg text-gray-400 hover:no-underline px-2">
            Home
          </a>
        </Link>
        <Link href="/blog">
          <a className="text-lg text-gray-400 hover:no-underline px-2">
            Blog
          </a>
        </Link>
        <Link href="/projects">
          <a className="text-lg text-gray-400 hover:no-underline px-2">
            Projects
          </a>
        </Link>
        <div className="flex flex-row gap-x-4 px-2">
          <SocialButtons />
        </div>
      </div>
    </div>
  );
}

function SocialButtons() {
  return (
    <>
      <Link href="https://github.com/sony-mathew">
        <a target="_blank">
          <img
            src="/icons/github.svg"
            className={`${styles.icon}`}
            alt="Github"
          />
        </a>
      </Link>
      <Link href="https://twitter.com/sonymathew_">
        <a target="_blank">
          <img
            src="/icons/twitter.svg"
            className={`${styles.icon}`}
            alt="Twitter"
          />
        </a>
      </Link>
      <Link href="https://www.linkedin.com/in/sonymathew/">
        <a target="_blank">
          <img
            src="/icons/linkedin.svg"
            className={`${styles.icon}`}
            alt="LinkedIn"
          />
        </a>
      </Link>
    </>
  );
}

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
            DEFAULT_CONFIG.siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={DEFAULT_CONFIG.siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <div className="hidden lg:block">
          <DesktopLayout />
        </div>
        <div className="block lg:hidden">
          <MobileLayout />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
