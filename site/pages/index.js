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

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{ DEFAULT_CONFIG.siteTitle } by {DEFAULT_CONFIG.author}</title>
        { MetaData() }
      </Head>
      <div className="flex-container gap-8 items-center justify-center">
        <div className="flex-none flex-col items-center justify-center gap-4">
          <Link href="/">
              <img
                src="/images/sony.jpeg"
                className={`${utilStyles.profileImage} ${utilStyles.borderCircle}`}
                alt={DEFAULT_CONFIG.author}
              />
          </Link>
          <h2>{DEFAULT_CONFIG.author}</h2>
        </div>

        <div className="flex-auto flex-col items-center justify-center gap-4">
  
          <div className="text-left">

          I'm an engineer hailing from Kerala, India. My entrepreneurial journey took flight when I co-founded Marketfox, which earned a spot in YCombinator's W17 batch. 
          After an enriching stint at <Link href="https://www.freshworks.com/" target="_blank">Freshworks</Link>&nbsp; during its early days, where I gained deep insights 
          into building SaaS businesses, I channeled that experience into pursuing my own entrepreneurial ventures. 
          <br/><br/>
          Now, as a Senior Engineering Manager at Postman, I continue to explore the fascinating world of technology while pursuing my 
          diverse interests in startups, philosophy, economics, and open-source development. I'm particularly passionate about 
          contributing to the <Link href="https://github.com/sony-mathew" target="_blank">open-source</Link> community and sharing my experiences in technology, leadership, and entrepreneurship.
          </div>
        </div>

      </div>

        <br></br>

        <h3>Recent Ramblings</h3>
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
      
      <p>
        <Link href="/blog">
          See All Articles →
        </Link>
      </p>

      <SubscribeNewsletter />
    </Layout>
  );
}
