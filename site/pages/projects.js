import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem}>
            <Link href={`/projects/compare-yml`}>
              <a>Ruby Gem: Compare YML</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={'2020-04-12'} />
            </small>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
