import Head from "next/head";
import Link from "next/link";
import DEFAULT_CONFIG from '../config/default_config';
import Layout from "../components/layout";
import DateComponent from "../components/date";
import { MetaData } from "../components/meta_data";
import utilStyles from "../styles/utils.module.scss";
import { projectsList } from "../config/projectsList";

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Projects | { DEFAULT_CONFIG.siteTitle } by {DEFAULT_CONFIG.author} </title>
        { MetaData() }
      </Head>
      <section>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul className={utilStyles.list}>
          {projectsList.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/projects/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
