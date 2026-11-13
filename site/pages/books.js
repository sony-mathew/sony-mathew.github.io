import Head from "next/head";
import Layout from "../components/layout";
import DEFAULT_CONFIG from "../config/default_config";
import { books } from "../lib/books";
import styles from "../styles/books.module.scss";

const description =
  "Books by Sony Mathew about the people, decisions, and companies that shape how technology gets built.";

const stores = [
  { domain: "amazon.com", country: "US" },
  { domain: "amazon.in", country: "India" },
];

function EditionLink({ book, domain, asin, format, checkStock }) {
  return (
    <a
      className={styles.editionLink}
      href={`https://www.${domain}/dp/${asin}`}
      aria-label={`${format}${checkStock ? " (check stock)" : ""} on ${domain} for ${book.title}`}
    >
      {format}
      {checkStock && <span className={styles.stockNote}>Check stock</span>}
      <span className={styles.arrow} aria-hidden="true">↗</span>
    </a>
  );
}

function BookEntry({ book, first }) {
  return (
    <article id={book.id} aria-labelledby={`${book.id}-title`} className={styles.book}>
      {/* GitHub Pages serves the already optimized WebP covers as static files. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.cover}
        src={`/images/books/${book.id}.webp`}
        alt={`${book.title} book cover`}
        width={480}
        height={book.coverHeight}
        loading={first ? "eager" : "lazy"}
      />
      <div className={styles.bookDetails}>
        <p className={styles.eyebrow}>{book.topic}</p>
        <h2 id={`${book.id}-title`}>{book.title}</h2>
        <p className={styles.subtitle}>{book.subtitle}</p>
        <p className={styles.description}>{book.description}</p>
        <ul className={styles.stores} aria-label={`Where to buy ${book.title}`}>
          {stores.map(({ domain, country }) => (
            <li key={domain} className={styles.store}>
              <p className={styles.storeLabel}>
                <strong>{domain}</strong>
                <span>{country}</span>
              </p>
              <div className={styles.editions}>
                <EditionLink
                  book={book}
                  domain={domain}
                  asin={book.kindleAsin}
                  format="Kindle eBook"
                />
                <EditionLink
                  book={book}
                  domain={domain}
                  asin={book.paperbackAsin}
                  format="Paperback"
                  checkStock={country === "India" && book.checkPaperbackStockInIndia}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function BooksPage() {
  const title = `Books by ${DEFAULT_CONFIG.author}`;
  const url = `${DEFAULT_CONFIG.baseUrl}/books`;

  return (
    <Layout>
      <Head>
        <title>{`${title} | ${DEFAULT_CONFIG.siteTitle}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={DEFAULT_CONFIG.siteTitle} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
      </Head>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>By {DEFAULT_CONFIG.author}</p>
        <h1>Books<span aria-hidden="true">.</span></h1>
        <p className={styles.intro}>
          True stories about the people who build technology and the bets that shape what it becomes.
        </p>
        <nav className={styles.index} aria-label="Jump to a book">
          <ul>
            {books.map((book) => (
              <li key={book.id}><a href={`#${book.id}`}>{book.title}</a></li>
            ))}
          </ul>
        </nav>
      </header>
      <div className={styles.catalog}>
        {books.map((book, index) => (
          <BookEntry key={book.id} book={book} first={index === 0} />
        ))}
      </div>
    </Layout>
  );
}
