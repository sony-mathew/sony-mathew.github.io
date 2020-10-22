import Head from "next/head";
import DEFAULT_CONFIG from '../config/default_config';
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{DEFAULT_CONFIG.siteTitle} # Projects</title>
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
