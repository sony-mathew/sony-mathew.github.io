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
        <title>Solve the Puzzle</title>
        <meta name="robots" content="noindex"></meta>
        { MetaData() }
      </Head>
      <section>
        <h2 className={utilStyles.headingLg}>Congrats on reaching here.</h2>
        
        <br/>
        Dear S & A, <br/>
        <br/>
        Here is the second part of the code. 
        <br/><br/>

        XXXX-GMEPNR-XXXX

        <br/>
        <br/>
        Go read the book for the last part of the puzzle.

        <br/>
        <br/>
      </section>
    </Layout>
  );
}
