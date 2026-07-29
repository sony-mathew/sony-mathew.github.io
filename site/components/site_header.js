import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SocialButtons from "./social_buttons";
import ThemeSwitcher from "./theme_switcher";
import styles from "./site_header.module.scss";

const navigationItems = [
  { href: "/tools", label: "Tools" },
  { href: "/daily-news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

function isCurrentSection(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationLink({ href, label, pathname, onClick, mobile = false }) {
  const isCurrent = isCurrentSection(pathname, href);

  return (
    <Link
      href={href}
      className={`${mobile ? styles.mobileNavLink : styles.navLink} ${
        isCurrent ? styles.activeNavLink : ""
      }`}
      aria-current={isCurrent ? "page" : undefined}
      onClick={onClick}
    >
      {label}
      {mobile && <span aria-hidden="true">→</span>}
    </Link>
  );
}

export default function SiteHeader() {
  const router = useRouter();
  const [navMenuOpened, setNavMenuOpened] = useState(false);

  useEffect(() => {
    if (!navMenuOpened) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setNavMenuOpened(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [navMenuOpened]);

  return (
    <div className={styles.headerShell}>
      <div className={styles.masthead}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="The Usual Ramblings, home"
        >
          <span className={styles.brandMark} aria-hidden="true">
            SM
          </span>
          <span className={styles.brandCopy}>
            <span className={styles.eyebrow}>Sony Mathew&apos;s notebook</span>
            <span className={styles.title}>
              The Usual <span>Ramblings</span>
              <b aria-hidden="true">.</b>
            </span>
          </span>
        </Link>

        <div className={styles.actions}>
          <nav className={styles.desktopNavigation} aria-label="Primary">
            <ul>
              {navigationItems.map(({ href, label }) => (
                <li key={href}>
                  <NavigationLink
                    href={href}
                    label={label}
                    pathname={router.pathname}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <span className={styles.themeControl}>
            <ThemeSwitcher className={styles.themeButton} />
          </span>

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={navMenuOpened}
            aria-controls="mobile-navigation"
            aria-label={navMenuOpened ? "Close navigation" : "Open navigation"}
            onClick={() => setNavMenuOpened((opened) => !opened)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {navMenuOpened && (
        <nav
          id="mobile-navigation"
          className={styles.mobileNavigation}
          aria-label="Mobile navigation"
        >
          <span className={styles.mobileNavigationLabel}>Explore</span>
          <ul>
            {navigationItems.map(({ href, label }) => (
              <li key={href}>
                <NavigationLink
                  href={href}
                  label={label}
                  pathname={router.pathname}
                  onClick={() => setNavMenuOpened(false)}
                  mobile
                />
              </li>
            ))}
          </ul>
          <div className={styles.mobileSocials} aria-label="Find me online">
            <SocialButtons />
          </div>
        </nav>
      )}
    </div>
  );
}
