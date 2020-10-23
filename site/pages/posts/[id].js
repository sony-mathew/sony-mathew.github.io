import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.scss";
import Tags from "../../components/tags";
import MailchimpSubscribe from "../../lib/mailchimp"

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <>
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div className="mt-5" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        
        {/* 
          <div className="mb-2">
            <span>Read more in </span>
            <Link href="/blog">
              <a className="hover:no-underline">{postData.categories}</a>
            </Link> category.
          </div> */}
          <Tags tags={postData.tags} />
          
          <div>{}</div>
        </article>
        <MailchimpSubscribe />
      </Layout>
    </>
  );
}
