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
            <img
              src="/images/sony.jpeg"
              className={`${utilStyles.profileImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
        </Link>
        <h2 className={utilStyles.headingLg}>{name}</h2>
      </section>
      <section className={utilStyles.headingMd}>
        

        <div className="text-left">
        As an engineer hailing from Kerala, India my entrepreneurial journey took a significant leap when I co-founded Marketfox, a venture that earned the distinction of being part of the YCombinator W17 batch. 
        The experience was profoundly enriching and packed with invaluable lessons.
        <br/><br/>
        My tenure at <Link href="https://www.freshworks.com/" target="_blank">Freshworks</Link>&nbsp; during its nascent stage provided me with a deep dive into the workings of a SaaS business. 
        This experience was not just enlightening but also served as a catalyst for my entrepreneurial spirit, motivating me to embark on my own venture.
Presently, I hold the position of Engineering Manager at Postman, where I continue to explore and contribute to the fascinating world of technology.
<br/><br/>
My interests are broad and varied, encompassing startups, philosophy, finance, economics, science, travel, and career development. I hold a special place in my heart for open-source software, and I seize every opportunity to <Link href="https://github.com/sony-mathew" target="_blank">contribute</Link> to this community.
</div>
        <br></br>

        <h3 className={utilStyles.headingLg}>Recent Ramblings</h3>
        <ul>
          {allPostsData.slice(0, 3).map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/blog/${id}`}>
                {title}
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
          See All Articles →
        </Link>
      </p>

      <SubscribeNewsletter />
    </Layout>
  );
}
