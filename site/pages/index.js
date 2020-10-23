import Head from "next/head";
import Layout from "../components/layout";
import DEFAULT_CONFIG from '../config/default_config';
import utilStyles from "../styles/utils.module.scss";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import MailchimpSubscribe from "../lib/mailchimp"

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
        <title>{DEFAULT_CONFIG.siteTitle}</title>
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
        <p className="text-center">
          I'm a Software Developer. Working remotely 🏖 &nbsp;
          <Link href="https://www.bigbinary.com/">
            <a target="_blank">@BigBinary</a>
          </Link>
          .
        </p>
        <br></br>

        <h3 className={utilStyles.headingLg}>Recent Ramblings</h3>
        <ul>
          {allPostsData.slice(0, 3).map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
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

      <MailchimpSubscribe />
    </Layout>
  );
}
