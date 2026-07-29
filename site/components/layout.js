import styles from "./layout.module.scss";
import SiteHeader from "./site_header";
import SiteFooter from "./site_footer";

export default function Layout({ children }) {
  return (
    <>
      <header className={styles.headerContainer}>
        <SiteHeader />
      </header>
      <main className={styles.container}>
        {children}
      </main>
      <footer className={styles.footerContainer}>
        <SiteFooter />
      </footer>
    </>
  );
}
