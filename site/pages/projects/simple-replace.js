import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import DEFAULT_CONFIG from "../../config/default_config";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import styles from "../../styles/simple-replace.module.scss";
import { projectsList } from "../../config/projectsList";
import {
  findMatches,
  findNextMatchIndex,
  replaceAllMatches,
  replaceMatch
} from "../../lib/simple_replace";

const PREFERENCES_KEY = "simpleReplace.preferences.v1";
const HISTORY_LIMIT = 100;
const INPUT_MERGE_WINDOW = 750;

const getMetaData = () => {
  return projectsList.find((project) => project.id === "simple-replace") || {};
};

const getInputGroup = (inputType) => {
  if (inputType === "insertText" || inputType === "insertCompositionText") {
    return "insert";
  }

  if (inputType === "deleteContentBackward") return "delete-backward";
  if (inputType === "deleteContentForward") return "delete-forward";
  return "";
};

const renderHighlightedContent = (content, matches, activeMatchIndex) => {
  const fragments = [];
  let cursor = 0;

  matches.forEach((match, index) => {
    if (match.start > cursor) {
      fragments.push(content.slice(cursor, match.start));
    }

    const isActive = index === activeMatchIndex;
    const className = [
      styles.match,
      isActive ? styles.activeMatch : "",
      match.start === match.end ? styles.zeroWidthMatch : ""
    ]
      .filter(Boolean)
      .join(" ");

    fragments.push(
      <mark className={className} key={`${match.start}-${match.end}-${index}`}>
        {match.start === match.end ? "\u200b" : content.slice(match.start, match.end)}
      </mark>
    );

    cursor = match.end;
  });

  fragments.push(content.slice(cursor));
  fragments.push(<span key="editor-sentinel">{"\u200b"}</span>);

  return fragments;
};

export default function SimpleReplacePage() {
  const meta = getMetaData();
  const textareaRef = useRef(null);
  const highlightLayerRef = useRef(null);
  const copyTimeoutRef = useRef(null);
  const beforeInputRef = useRef(null);
  const historyRef = useRef({
    past: [],
    future: [],
    lastInput: null
  });

  const [matchText, setMatchText] = useState("");
  const [replacementText, setReplacementText] = useState("");
  const [isRegex, setIsRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [content, setContent] = useState("");
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [copyState, setCopyState] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const matchResult = useMemo(
    () => findMatches(content, matchText, { isRegex, caseSensitive }),
    [caseSensitive, content, isRegex, matchText]
  );
  const matches = matchResult.matches;
  const safeActiveMatchIndex = matches.length
    ? Math.min(activeMatchIndex, matches.length - 1)
    : 0;
  const canReplace = !matchResult.error && matches.length > 0;

  const syncHighlightLayer = () => {
    const textarea = textareaRef.current;
    const highlightLayer = highlightLayerRef.current;

    if (!textarea || !highlightLayer) return;

    highlightLayer.scrollTop = textarea.scrollTop;
    highlightLayer.scrollLeft = textarea.scrollLeft;
    highlightLayer.style.width = `${textarea.clientWidth}px`;
    highlightLayer.style.height = `${textarea.clientHeight}px`;
  };

  const scheduleSelection = (start, end, shouldFocus = true) => {
    window.requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (shouldFocus) {
        textarea.focus({ preventScroll: true });
      }

      textarea.setSelectionRange(start, end);
      syncHighlightLayer();
    });
  };

  const currentSnapshot = () => {
    const textarea = textareaRef.current;

    return {
      content,
      selectionStart: textarea?.selectionStart ?? 0,
      selectionEnd: textarea?.selectionEnd ?? 0,
      activeMatchIndex: safeActiveMatchIndex
    };
  };

  const resetInputGrouping = () => {
    historyRef.current.lastInput = null;
    beforeInputRef.current = null;
  };

  const pushActionHistory = () => {
    const history = historyRef.current;
    history.past.push(currentSnapshot());

    if (history.past.length > HISTORY_LIMIT) {
      history.past.shift();
    }

    history.future = [];
    resetInputGrouping();
  };

  const applyHistorySnapshot = (snapshot, message) => {
    setContent(snapshot.content);
    setActiveMatchIndex(snapshot.activeMatchIndex);
    setStatusMessage(message);
    resetInputGrouping();
    scheduleSelection(snapshot.selectionStart, snapshot.selectionEnd);
  };

  const undo = () => {
    const history = historyRef.current;
    const snapshot = history.past.pop();
    if (!snapshot) return;

    history.future.push(currentSnapshot());
    applyHistorySnapshot(snapshot, "Undid the last content change.");
  };

  const redo = () => {
    const history = historyRef.current;
    const snapshot = history.future.pop();
    if (!snapshot) return;

    history.past.push(currentSnapshot());
    applyHistorySnapshot(snapshot, "Redid the content change.");
  };

  useEffect(() => {
    try {
      const storedPreferences = window.localStorage.getItem(PREFERENCES_KEY);

      if (storedPreferences) {
        const parsedPreferences = JSON.parse(storedPreferences);

        if (typeof parsedPreferences.matchText === "string") {
          setMatchText(parsedPreferences.matchText);
        }
        if (typeof parsedPreferences.replacementText === "string") {
          setReplacementText(parsedPreferences.replacementText);
        }
        if (typeof parsedPreferences.isRegex === "boolean") {
          setIsRegex(parsedPreferences.isRegex);
        }
        if (typeof parsedPreferences.caseSensitive === "boolean") {
          setCaseSensitive(parsedPreferences.caseSensitive);
        }
      }
    } catch (_) {
      // The tool remains usable when browser storage is unavailable or malformed.
    } finally {
      setPreferencesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;

    try {
      window.localStorage.setItem(
        PREFERENCES_KEY,
        JSON.stringify({
          matchText,
          replacementText,
          isRegex,
          caseSensitive
        })
      );
    } catch (_) {
      // Preference persistence is optional and must not block replacement.
    }
  }, [
    caseSensitive,
    isRegex,
    matchText,
    preferencesLoaded,
    replacementText
  ]);

  useEffect(() => {
    syncHighlightLayer();

    const textarea = textareaRef.current;
    if (!textarea) return undefined;

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncHighlightLayer)
        : null;

    resizeObserver?.observe(textarea);
    window.addEventListener("resize", syncHighlightLayer);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", syncHighlightLayer);
    };
  }, []);

  useEffect(() => {
    syncHighlightLayer();
  }, [content, matches.length]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const updateSearchPreference = (update) => {
    update();
    setActiveMatchIndex(0);
    setStatusMessage("");
  };

  const handleBeforeInput = (event) => {
    beforeInputRef.current = {
      inputType: event.nativeEvent?.inputType || "",
      selectionStart: event.currentTarget.selectionStart,
      selectionEnd: event.currentTarget.selectionEnd
    };
  };

  const handleContentChange = (event) => {
    const nextContent = event.currentTarget.value;
    if (nextContent === content) return;

    const history = historyRef.current;
    const now = Date.now();
    const beforeInput = beforeInputRef.current || {
      inputType: event.nativeEvent?.inputType || "",
      selectionStart: event.currentTarget.selectionStart,
      selectionEnd: event.currentTarget.selectionEnd
    };
    const inputType =
      event.nativeEvent?.inputType || beforeInput.inputType || "input";
    const inputGroup = getInputGroup(inputType);
    const lastInput = history.lastInput;
    const canMerge =
      inputGroup &&
      lastInput?.inputGroup === inputGroup &&
      now - lastInput.timestamp <= INPUT_MERGE_WINDOW &&
      lastInput.selectionStart === beforeInput.selectionStart &&
      lastInput.selectionEnd === beforeInput.selectionEnd;

    if (!canMerge) {
      history.past.push(currentSnapshot());

      if (history.past.length > HISTORY_LIMIT) {
        history.past.shift();
      }
    }

    history.future = [];
    history.lastInput = inputGroup
      ? {
          inputGroup,
          timestamp: now,
          selectionStart: event.currentTarget.selectionStart,
          selectionEnd: event.currentTarget.selectionEnd
        }
      : null;
    beforeInputRef.current = null;

    setContent(nextContent);
    setActiveMatchIndex(0);
    setStatusMessage("");
  };

  const handleEditorKeyDown = (event) => {
    const modifierPressed = event.metaKey || event.ctrlKey;
    if (!modifierPressed) return;

    const key = event.key.toLowerCase();
    const isUndo = key === "z" && !event.shiftKey;
    const isRedo =
      (key === "z" && event.shiftKey) || (key === "y" && !event.shiftKey);

    if (isUndo) {
      event.preventDefault();
      undo();
    } else if (isRedo) {
      event.preventDefault();
      redo();
    }
  };

  const replaceCurrentMatch = () => {
    if (!canReplace) return;

    const currentMatch = matches[safeActiveMatchIndex];
    const replacementResult = replaceMatch(
      content,
      currentMatch,
      replacementText,
      { isRegex }
    );

    if (replacementResult.content !== content) {
      pushActionHistory();
      setContent(replacementResult.content);
    }

    const nextResult = findMatches(replacementResult.content, matchText, {
      isRegex,
      caseSensitive
    });
    const nextIndex = findNextMatchIndex(
      nextResult.matches,
      replacementResult.nextOffset
    );

    setActiveMatchIndex(nextIndex);

    if (nextResult.matches.length) {
      const nextMatch = nextResult.matches[nextIndex];
      scheduleSelection(nextMatch.start, nextMatch.end);
      setStatusMessage(
        `Replaced one match. ${nextResult.matches.length} ${
          nextResult.matches.length === 1 ? "match remains" : "matches remain"
        }.`
      );
    } else {
      scheduleSelection(
        replacementResult.nextOffset,
        replacementResult.nextOffset
      );
      setStatusMessage("Replaced one match. No matches remain.");
    }
  };

  const replaceEveryMatch = () => {
    if (!canReplace) return;

    const matchCount = matches.length;
    const nextContent = replaceAllMatches(content, matches, replacementText, {
      isRegex
    });

    if (nextContent !== content) {
      pushActionHistory();
      setContent(nextContent);
    }

    const nextResult = findMatches(nextContent, matchText, {
      isRegex,
      caseSensitive
    });

    setActiveMatchIndex(0);

    if (nextResult.matches.length) {
      scheduleSelection(
        nextResult.matches[0].start,
        nextResult.matches[0].end
      );
    } else {
      scheduleSelection(nextContent.length, nextContent.length);
    }

    setStatusMessage(
      nextContent === content
        ? "The replacement leaves the content unchanged."
        : `Replaced ${matchCount} ${matchCount === 1 ? "match" : "matches"}.`
    );
  };

  const clearContent = () => {
    if (!content) return;

    pushActionHistory();
    setContent("");
    setActiveMatchIndex(0);
    setStatusMessage("Content cleared.");
    scheduleSelection(0, 0);
  };

  const copyContent = async () => {
    if (!content) return;

    if (!navigator.clipboard) {
      setCopyState("error");
      setStatusMessage("Clipboard access is unavailable in this browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      setCopyState("copied");
      setStatusMessage("Content copied to the clipboard.");

      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = window.setTimeout(
        () => setCopyState("idle"),
        1600
      );
    } catch (_) {
      setCopyState("error");
      setStatusMessage("Copy failed. Select the content and copy it manually.");
    }
  };

  const matchSummary = matchResult.error
    ? "Invalid regex"
    : !matchText
      ? "No search text"
      : !matches.length
        ? "No matches"
        : `${safeActiveMatchIndex + 1} of ${matches.length} ${
            matches.length === 1 ? "match" : "matches"
          }`;

  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.description} />

        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.imageUrl} />
        <meta
          property="og:url"
          content={`${DEFAULT_CONFIG.baseUrl}/projects/simple-replace`}
        />
        <meta property="og:site_name" content={DEFAULT_CONFIG.siteTitle} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta
          name="twitter:creator"
          content={`@${DEFAULT_CONFIG.authorTwitterHandle}`}
        />
        <meta name="twitter:image" content={meta.imageUrl} />
        <meta name="twitter:image:alt" content={meta.title} />
      </Head>

      <article className={styles.page}>
        <h2 className={`${utilStyles.headingLg} ${styles.title}`}>
          Simple Replace
        </h2>
        <p className={styles.intro}>
          Find and replace plain text or regular expressions. Everything stays
          in your browser.
        </p>

        <section className={`${styles.panel} ${styles.searchPanel}`}>
          <div className={styles.searchHeader}>
            <div
              className={styles.modeSelector}
              aria-label="Text matching mode"
              role="group"
            >
              <button
                type="button"
                aria-pressed={!isRegex}
                className={`${styles.modeButton} ${
                  !isRegex ? styles.modeButtonActive : ""
                }`}
                onClick={() =>
                  updateSearchPreference(() => setIsRegex(false))
                }
              >
                Plain text
              </button>
              <button
                type="button"
                aria-pressed={isRegex}
                className={`${styles.modeButton} ${
                  isRegex ? styles.modeButtonActive : ""
                }`}
                onClick={() => updateSearchPreference(() => setIsRegex(true))}
              >
                Regex
              </button>
            </div>

            <label className={styles.caseOption}>
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(event) =>
                  updateSearchPreference(() =>
                    setCaseSensitive(event.target.checked)
                  )
                }
              />
              <span>Case sensitive</span>
            </label>
          </div>

          <div className={styles.inputGrid}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Text to match</span>
              <input
                type="text"
                value={matchText}
                onChange={(event) =>
                  updateSearchPreference(() => setMatchText(event.target.value))
                }
                className={styles.textInput}
                placeholder={isRegex ? "Example: (\\w+)@(\\w+)" : "Text to find"}
                aria-invalid={Boolean(matchResult.error)}
                aria-describedby={
                  matchResult.error ? "simple-replace-regex-error" : undefined
                }
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Replace with</span>
              <input
                type="text"
                value={replacementText}
                onChange={(event) =>
                  updateSearchPreference(() =>
                    setReplacementText(event.target.value)
                  )
                }
                className={styles.textInput}
                placeholder="Leave empty to remove matches"
              />
            </label>
          </div>

          {isRegex && !matchResult.error && (
            <p className={styles.helpText}>
              Enter the pattern without slashes. Replacement groups such as $1
              and $&lt;name&gt; are supported.
            </p>
          )}

          {matchResult.error && (
            <p
              className={styles.errorMessage}
              id="simple-replace-regex-error"
              role="alert"
            >
              Invalid regex: {matchResult.error}
            </p>
          )}
        </section>

        <section className={`${styles.panel} ${styles.editorPanel}`}>
          <div className={styles.editorToolbar}>
            <div className={styles.replaceActions}>
              <button
                type="button"
                onClick={replaceCurrentMatch}
                disabled={!canReplace}
                className={`${styles.actionButton} ${styles.primaryAction}`}
              >
                Replace One by One
              </button>
              <button
                type="button"
                onClick={replaceEveryMatch}
                disabled={!canReplace}
                className={`${styles.actionButton} ${styles.primaryAction}`}
              >
                Replace All
              </button>
              <button
                type="button"
                onClick={clearContent}
                disabled={!content}
                className={`${styles.actionButton} ${styles.secondaryAction}`}
              >
                Clear Content
              </button>
            </div>

            <div className={styles.editorMeta}>
              <span className={styles.matchCount}>{matchSummary}</span>
              <button
                type="button"
                onClick={copyContent}
                disabled={!content}
                className={styles.copyButton}
                aria-label={
                  copyState === "copied" ? "Content copied" : "Copy content"
                }
                title={copyState === "copied" ? "Copied" : "Copy content"}
              >
                <span
                  className={`${styles.copyIcon} ${
                    copyState === "copied" ? styles.copyIconCopied : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <label className={styles.contentLabel} htmlFor="replace-content">
            Content
          </label>
          <div className={styles.editorWrapper}>
            <div
              ref={highlightLayerRef}
              className={styles.highlightLayer}
              aria-hidden="true"
            >
              {renderHighlightedContent(
                content,
                matches,
                safeActiveMatchIndex
              )}
            </div>
            <textarea
              ref={textareaRef}
              id="replace-content"
              value={content}
              onBeforeInput={handleBeforeInput}
              onChange={handleContentChange}
              onKeyDown={handleEditorKeyDown}
              onScroll={syncHighlightLayer}
              rows={18}
              spellCheck="false"
              className={styles.contentTextarea}
              placeholder="Paste or type content here"
            />
          </div>

          <div className={styles.editorFooter}>
            <span>{content.length.toLocaleString()} characters</span>
            <span>Undo: Cmd/Ctrl+Z · Redo: Shift+Cmd/Ctrl+Z or Ctrl+Y</span>
          </div>
        </section>

        <div className={styles.statusRegion} aria-live="polite">
          {statusMessage}
        </div>
      </article>
    </Layout>
  );
}
