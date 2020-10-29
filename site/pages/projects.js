import Head from "next/head";
import Link from "next/link";
import DEFAULT_CONFIG from '../config/default_config';
import { getSortedProjectsData } from "../lib/projects";
import Layout from "../components/layout";
import DateComponent from "../components/date";
import { MetaData } from "../components/meta_data"
import utilStyles from "../styles/utils.module.scss";

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
        <title>Projects | { DEFAULT_CONFIG.siteTitle } | by { DEFAULT_CONFIG.author }</title>
        { MetaData() }
      </Head>
      <section>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul className={utilStyles.list}>    
          {allProjectsData.map(({ id, date, title, readingTime }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/projects/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent dateString={date} /> • {readingTime} min read
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
