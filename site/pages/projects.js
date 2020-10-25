import Head from "next/head";
import DEFAULT_CONFIG from '../config/default_config';
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import { getSortedProjectsData } from "../lib/projects";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allProjectsData = getSortedProjectsData();
  return {
    props: {
      allProjectsData,
    },
  };
}

export default function Home({ allProjectsData }) {
  return (
    <Layout>
      <Head>
        <title>{DEFAULT_CONFIG.siteTitle} - Projects</title>
      </Head>
      <section>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul className={utilStyles.list}>    
          {allProjectsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/projects/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
