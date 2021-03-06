import Head from "next/head";
import Link from "next/link";
import DEFAULT_CONFIG from '../config/default_config';
import { getSortedPostsData } from "../lib/posts";
import SubscribeNewsletter from "../lib/subscribe_newsletter";
import Layout from "../components/layout";
import Date from "../components/date";
import { MetaData } from "../components/meta_data";
import utilStyles from "../styles/utils.module.scss";


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
const name = "Sony Mathew";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{ DEFAULT_CONFIG.siteTitle } | by {DEFAULT_CONFIG.author}</title>
        { MetaData() }
      </Head>
      <section className={utilStyles.profile}>
        <Link href="/">
          <a>
            <img
              src="/images/sony.jpeg"
              className={`${utilStyles.profileImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
          </a>
        </Link>
        <h2 className={utilStyles.headingLg}>{name}</h2>
      </section>
      <section className={utilStyles.headingMd}>
        <div className="text-center">
          I'm a Software Engineer, working remotely&nbsp;
          <Link href="https://www.postman.com/">
            <a target="_blank">@Postman</a>
          </Link> 🚀
        </div>
        <br></br>

        <h3 className={utilStyles.headingLg}>Recent Ramblings</h3>
        <ul>
          {allPostsData.slice(0, 3).map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/blog/${id}`}>
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
      <p>
        <Link href="/blog">
          <a>See All Articles →</a>
        </Link>
      </p>

      <SubscribeNewsletter />
    </Layout>
  );
}
