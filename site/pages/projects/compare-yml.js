import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.scss";
import Link from "next/link";


export default function CompareYml() {
  return (
    <Layout>
      <Head>
        <title>Compare YML</title>
      </Head>
      <div>
        <h1 className={utilStyles.headingXl}>Compare YML</h1>

        <article>
          <p>
            In most of the rails projects at one point in time, the problems
            that comes with internationalization <code>I18n</code> is not of day
            to day one, but rather a tedious and manual time consuming one. Most
            of the time the developers add the keys in primary language
            translation file
            <code>(en.yml)</code> and leave the rest of language translations
            stale.{" "}
          </p>
          <br></br>
          <p>
            When a customer reports the inconsistencies in the translation, the
            tedious boring manual work of comparing these keys and finding out
            which translations are missing for what all languages is trusted
            into the hands of an unlucky developer by the Product Manager. This
            tool is a way to escape those situations with a bunch of commands
            and to enjoy rest of the weekend in peace.
          </p>
          <br></br>
          <p>
            Check this out in rubygems.org: <Link href="https://rubygems.org/gems/compare-yml/">
              <a>compare-yml</a>
            </Link>
          </p>
        </article>
      </div>
    </Layout>
  );
}
