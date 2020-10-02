import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

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
        <title>{siteTitle}</title>
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
        <h2 className={utilStyles.headingLg}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>{name}</a>
          </Link>
        </h2>
      </section>
      <section className={utilStyles.headingMd}>
        <p className="text-center">
          I'm a Software Developer. Working remotely 🏖 at &nbsp;
          <Link href="https://www.bigbinary.com/">
            <a>BigBinary</a>
          </Link>
          .
        </p>
        <br></br>

        <h2 className={utilStyles.headingLg}>Recent Ramblings</h2>
        <ul className={utilStyles.list}>
          {allPostsData.slice(0, 3).map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
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
        <div>
          <Link href="/blog">
            <a>See All Articles</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
