import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import SubscribeNewsletter from "../../lib/subscribe_newsletter";
import Share from "../../lib/share";
import Layout from "../../components/layout";
import { ArticleMeta } from "../../components/meta_data";
import DateComponent from "../../components/date";
import Tags from "../../components/tags";
import utilStyles from "../../styles/utils.module.scss";
import { TableOfContents } from "../../components/table_of_contents";

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
          { ArticleMeta({ article: postData }) }
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <div>{postData.author}</div>
            <DateComponent dateString={postData.date} /> • {postData.readingTime} min read
          </div>

          <TableOfContents article={postData} />
          
          <div className="mt-5" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        
          {/* 
            <div className="mb-2">
              <span>Read more in </span>
              <Link href="/blog" className="hover:no-underline">
                {postData.categories}
              </Link> category.
            </div>
          */}

          <Tags tags={postData.tags} />
        </article>
        <Share />
        <SubscribeNewsletter />
      </Layout>
    </>
  );
}
