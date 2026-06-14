import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import DEFAULT_CONFIG from "../../config/default_config";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import styles from "../../styles/base64.module.scss";
import { projectsList } from "../../config/projectsList";
import { decodeBase64Text, encodeBase64Text } from "../../lib/base64";

const getMetaData = () => {
  return projectsList.filter((p) => p.id === "base64-encoder-decoder")[0] || {};
};

export default function Base64EncoderDecoderPage() {
  const meta = getMetaData();
  const copyTimeoutRef = useRef(null);
  const [plainText, setPlainText] = useState("");
  const [base64Text, setBase64Text] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedTarget, setCopiedTarget] = useState("");
  const base64CharacterCount = base64Text.replace(/\s/g, "").length;

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const updateFromPlainText = (value) => {
    setPlainText(value);

    try {
      setBase64Text(encodeBase64Text(value));
      setErrorMessage("");
    } catch (_) {
      setErrorMessage("Unable to encode this text.");
    }
  };

  const updateFromBase64Text = (value) => {
    setBase64Text(value);

    if (!value.trim()) {
      setPlainText("");
      setErrorMessage("");
      return;
    }

    try {
      setPlainText(decodeBase64Text(value));
      setErrorMessage("");
    } catch (_) {
      setPlainText("");
      setErrorMessage("Base64 must decode to valid UTF-8 text.");
    }
  };

  const clearValues = () => {
    setPlainText("");
    setBase64Text("");
    setErrorMessage("");
    setCopiedTarget("");
  };

  const copyValue = async (value, target) => {
    if (!value) return;

    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setErrorMessage("Clipboard is unavailable in this browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopiedTarget(target);
      setErrorMessage("");

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => setCopiedTarget(""), 1600);
    } catch (_) {
      setErrorMessage("Copy failed in this browser.");
    }
  };

  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <meta name="title" content={ meta.title } />
        <meta name="description" content={ meta.description } />

        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
        <meta property="og:image" content={ meta.imageUrl } />
        <meta property="og:url" content={ `${DEFAULT_CONFIG.baseUrl}/projects/base64-encoder-decoder` } />
        <meta property="og:site_name" content={ DEFAULT_CONFIG.siteTitle } />

        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={ meta.date } />
        <meta property="article:author" content={ meta.author } />
        <meta property="article:tag" content={ meta.tags } />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ meta.title } />
        <meta name="twitter:description" content={ meta.description } />
        <meta name="twitter:creator" content={ `@${DEFAULT_CONFIG.authorTwitterHandle}` } />
        <meta name="twitter:image" content={ meta.imageUrl } />
        <meta name="twitter:image:alt" content={ meta.title } />
      </Head>

      <article className={styles.page}>
        <h2 className={`${utilStyles.headingLg} ${styles.title}`}>Base64 Encoder Decoder</h2>

        <div className={styles.toolbar}>
          <button
            type="button"
            onClick={() => copyValue(plainText, "plain")}
            disabled={!plainText}
            className={`${styles.actionButton} ${styles.textAction}`}
          >
            {copiedTarget === "plain" ? "Copied" : "Copy Text"}
          </button>
          <button
            type="button"
            onClick={() => copyValue(base64Text, "base64")}
            disabled={!base64Text}
            className={`${styles.actionButton} ${styles.base64Action}`}
          >
            {copiedTarget === "base64" ? "Copied" : "Copy Base64"}
          </button>
          <button
            type="button"
            onClick={clearValues}
            disabled={!plainText && !base64Text}
            className={`${styles.actionButton} ${styles.clearAction}`}
          >
            Clear
          </button>
        </div>

        <div className={styles.panelGrid}>
          <section className={`${styles.panel} ${styles.textPanel}`}>
            <div className={styles.panelHeader}>
              <label className={styles.panelLabel} htmlFor="plain-text-input">
                Text
              </label>
              <span className={styles.panelCount}>{plainText.length} chars</span>
            </div>
            <textarea
              id="plain-text-input"
              value={plainText}
              onChange={(event) => updateFromPlainText(event.target.value)}
              rows={14}
              spellCheck="false"
              className={styles.textarea}
              placeholder="Type text here"
            />
          </section>

          <section className={`${styles.panel} ${styles.base64Panel}`}>
            <div className={styles.panelHeader}>
              <label className={styles.panelLabel} htmlFor="base64-text-input">
                Base64
              </label>
              <span className={styles.panelCount}>{base64CharacterCount} chars</span>
            </div>
            <textarea
              id="base64-text-input"
              value={base64Text}
              onChange={(event) => updateFromBase64Text(event.target.value)}
              rows={14}
              spellCheck="false"
              className={styles.textarea}
              placeholder="Paste Base64 here"
            />
          </section>
        </div>

        <div className={styles.statusRegion} aria-live="polite">
          {errorMessage && (
            <p className={styles.errorMessage}>
              {errorMessage}
            </p>
          )}
        </div>
      </article>
    </Layout>
  );
}
