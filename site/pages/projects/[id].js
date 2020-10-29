import Head from "next/head";
import { getAllProjectIds, getProjectData } from "../../lib/projects";
import Layout from "../../components/layout";
import { ArticleMeta } from "../../components/meta_data";
import DateComponent from "../../components/date";
import utilStyles from "../../styles/utils.module.scss";

export async function getStaticPaths() {
  const paths = getAllProjectIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const projectData = await getProjectData(params.id);
  return {
    props: {
      projectData,
    },
  };
}

export default function Project({ projectData }) {
  return (
    <Layout>
      <Head>
        { ArticleMeta({ article: projectData }) }
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{projectData.title}</h1>
        <div className={utilStyles.lightText}>
          <div>{projectData.author}</div>
          <DateComponent dateString={projectData.date} /> • {projectData.readingTime} min read
        </div>
        <div className="mt-5" dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
      </article>
    </Layout>
  );
}
