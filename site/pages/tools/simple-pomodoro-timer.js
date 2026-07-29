import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import DEFAULT_CONFIG from '../../config/default_config';
import Layout from "../../components/layout";
import ToolPageHeader from "../../components/tool_page_header";
import { projectsList}  from "../../config/projectsList";
import styles from "../../styles/simple-pomodoro-timer.module.scss";

const getMetaData = () => {
  return projectsList.filter((p) => p.id === 'simple-pomodoro-timer')[0] || {};
}

const TimerIcon = ({ name }) => {
  if (name === "pause") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 6v12M16 6v12" />
      </svg>
    );
  }

  if (name === "reset") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 8v5h5" />
        <path d="M6.5 16a7 7 0 1 0 .5-8L5 10" />
      </svg>
    );
  }

  if (name === "volume-off") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11 6 7 10H4v4h3l4 4V6Z" />
        <path d="m16 10 4 4m0-4-4 4" />
      </svg>
    );
  }

  if (name === "volume") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11 6 7 10H4v4h3l4 4V6Z" />
        <path d="M15 9.5a4 4 0 0 1 0 5M18 7a7 7 0 0 1 0 10" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 6 9 6-9 6V6Z" />
    </svg>
  );
};

export default function SimplePomodoroTimerPage() {
  const meta = getMetaData();

  // Timer constants
  const WORK = "work";
  const BREAK = "break";
  const WORK_DEFAULT = 25 * 60;   // 25 minutes in seconds
  const BREAK_DEFAULT = 5 * 60;   // 5 minutes in seconds

  // Independent state for each timer
  const [timeLeftWork, setTimeLeftWork]   = useState(WORK_DEFAULT);
  const [timeLeftBreak, setTimeLeftBreak] = useState(BREAK_DEFAULT);

  const [activeTab,   setActiveTab]   = useState(WORK);
  const [runningType, setRunningType] = useState(null); // 'work' | 'break' | null
  const [isPaused,    setIsPaused]    = useState(false);

  // Additional state for note taking
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);

  // Timer accuracy improvements
  const startTimeRef = useRef(null);
  const targetEndTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const textareaRef = useRef(null); // Add ref for textarea

  // Audio alarm functionality
  const audioContextRef = useRef(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  // LocalStorage key
  const LS_KEY = "pomodoro_notes";
  const AUDIO_LS_KEY = "pomodoro_audio_enabled";

  // Load notes and audio preference on mount
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null;
    if (stored) {
      try {
        setNotes(JSON.parse(stored));
      } catch (_) {}
    }

    // Load audio preference
    const audioStored = typeof window !== "undefined" ? localStorage.getItem(AUDIO_LS_KEY) : null;
    if (audioStored !== null) {
      setIsAudioEnabled(audioStored === 'true');
    }
  }, []);

  const persistNotes = (newNotes) => {
    setNotes(newNotes);
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, JSON.stringify(newNotes));
    }
  };

  const persistAudioPreference = (enabled) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUDIO_LS_KEY, enabled.toString());
    }
  };

  const playAlarmSound = () => {
    if (!isAudioEnabled || typeof window === "undefined") return;

    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      
      // Create oscillator for alarm sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configure alarm sound - 10 second duration with repeating pattern
      oscillator.type = 'sine';
      
      // Create a repeating pattern for 10 seconds
      const startTime = audioContext.currentTime;
      const duration = 10; // 10 seconds
      
      // Play alternating frequencies every 0.5 seconds for 10 seconds
      for (let i = 0; i < duration * 2; i++) {
        const time = startTime + (i * 0.5);
        const frequency = i % 2 === 0 ? 800 : 1000; // Alternate between 800Hz and 1000Hz
        
        oscillator.frequency.setValueAtTime(frequency, time);
        
        // Volume envelope for each beep
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.2, time + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, time + 0.4);
      }
      
      // Play the sound
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
      
    } catch (error) {
      console.warn('Could not play alarm sound:', error);
    }
  };

  const saveCurrentNote = () => {
    // Get the current value from the textarea ref to ensure we capture any pending input
    const currentText = textareaRef.current ? textareaRef.current.value : noteInput;
    const text = currentText.trim() === "" ? "No Notes." : currentText.trim();
    const entry = { ts: Date.now(), text };
    const updated = [entry, ...notes].slice(0, 100);
    setNoteInput("");
    persistNotes(updated);
  };

  // Derived helpers
  const timeLeft = activeTab === WORK ? timeLeftWork : timeLeftBreak;
  const minutes  = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds  = String(timeLeft % 60).padStart(2, "0");

  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = () => {
    if (!startTimeRef.current || !targetEndTimeRef.current) return;

    const now = Date.now();
    const elapsed = Math.floor((now - startTimeRef.current) / 1000);
    const targetDuration = Math.floor((targetEndTimeRef.current - startTimeRef.current) / 1000);
    const remaining = Math.max(0, targetDuration - elapsed);

    setRunningType(prevRunning => {
      if (prevRunning === WORK) {
        if (remaining > 0) {
          setTimeLeftWork(remaining);
          return prevRunning; // Keep the same running type
        } else {
          setTimeLeftWork(WORK_DEFAULT); // Reset to default instead of 0
          saveCurrentNote();
          clearExistingInterval();
          setIsPaused(false); // Ensure pause state is reset
          playAlarmSound(); // Play alarm when work timer completes
          return null; // Set running type to null
        }
      } else if (prevRunning === BREAK) {
        if (remaining > 0) {
          setTimeLeftBreak(remaining);
          return prevRunning; // Keep the same running type
        } else {
          setTimeLeftBreak(BREAK_DEFAULT); // Reset to default instead of 0
          saveCurrentNote();
          clearExistingInterval();
          setIsPaused(false); // Ensure pause state is reset
          playAlarmSound(); // Play alarm when break timer completes
          return null; // Set running type to null
        }
      }
      return prevRunning;
    });
  };

  const startTimer = () => {
    // If some other timer is running, stop it first
    clearExistingInterval();

    // Reset the previous timer (if different) back to its default value
    if (runningType && runningType !== activeTab) {
      if (runningType === WORK) {
        setTimeLeftWork(WORK_DEFAULT);
      } else if (runningType === BREAK) {
        setTimeLeftBreak(BREAK_DEFAULT);
      }
    }

    const duration = activeTab === WORK ? timeLeftWork : timeLeftBreak;
    const now = Date.now();
    
    startTimeRef.current = now;
    targetEndTimeRef.current = now + (duration * 1000);

    setIsPaused(false);
    setRunningType(activeTab);
    
    // Use a more frequent interval for better accuracy, but calculate based on actual elapsed time
    intervalRef.current = setInterval(tick, 100);
  };

  const pauseResume = () => {
    if (runningType !== activeTab) return; // safety
    
    if (isPaused) {
      // resume - adjust the start time to account for the pause
      const currentTimeLeft = activeTab === WORK ? timeLeftWork : timeLeftBreak;
      const now = Date.now();
      
      startTimeRef.current = now - ((activeTab === WORK ? WORK_DEFAULT : BREAK_DEFAULT) - currentTimeLeft) * 1000;
      targetEndTimeRef.current = startTimeRef.current + (activeTab === WORK ? WORK_DEFAULT : BREAK_DEFAULT) * 1000;
      
      intervalRef.current = setInterval(tick, 100);
      setIsPaused(false);
    } else {
      // pause
      clearExistingInterval();
      setIsPaused(true);
    }
  };

  const cancelTimer = () => {
    clearExistingInterval();
    startTimeRef.current = null;
    targetEndTimeRef.current = null;
    
    if (activeTab === WORK) {
      setTimeLeftWork(WORK_DEFAULT);
    } else {
      setTimeLeftBreak(BREAK_DEFAULT);
    }
    setRunningType(null);
    setIsPaused(false);
  };

  const toggleAudio = () => {
    const newValue = !isAudioEnabled;
    setIsAudioEnabled(newValue);
    persistAudioPreference(newValue);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearExistingInterval();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle page visibility changes to prevent drift when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && runningType) {
        // Tab became hidden, but we don't need to do anything special
        // The timer will continue to work correctly based on elapsed time
      } else if (!document.hidden && runningType && !isPaused) {
        // Tab became visible again, ensure timer is still running
        if (!intervalRef.current) {
          intervalRef.current = setInterval(tick, 100);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [runningType, isPaused]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const dateFormatter = (ts) => {
    return new Date(ts).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } 

  // Determine buttons to show
  const showStart = runningType !== activeTab;
  const showPauseResume = runningType === activeTab;
  const activeDuration = activeTab === WORK ? WORK_DEFAULT : BREAK_DEFAULT;
  const timerProgress = Math.max(0, Math.min(360, (timeLeft / activeDuration) * 360));
  const currentTimerIsRunning = runningType === activeTab;
  const timerStatus = currentTimerIsRunning
    ? (isPaused ? "Paused" : "In progress")
    : "Ready";
  const sessionLabel = activeTab === WORK ? "Focus session" : "Recovery break";
  const nextLabel = activeTab === WORK ? "Break" : "Focus";
  const nextDuration = activeTab === WORK ? "5 min" : "25 min";

  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <meta name="title" content={ meta.title } />
        <meta name="description" content={ meta.description } />

        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
        <meta property="og:image" content={ meta.imageUrl } />
        <meta property="og:url" content={ `${DEFAULT_CONFIG.baseUrl}/tools/simple-pomodoro-timer` } />
        <meta property="og:site_name" content={ DEFAULT_CONFIG.siteTitle } />

        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={ meta.date } />
        <meta property="article:author" content={ meta.author } />
        <meta property="article:tag" content={ meta.tags } />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ meta.title } />
        <meta name="twitter:description" content={ meta.description } />
        { 
          //<meta name="twitter:site" content={ `@${DEFAULT_CONFIG.authorTwitterHandle}` } /> 
        }
        <meta name="twitter:creator" content={ `@${DEFAULT_CONFIG.authorTwitterHandle}` } />
        <meta name="twitter:image" content={ meta.imageUrl } />
        <meta name="twitter:image:alt" content={ meta.title } />
      </Head>

      <article className={styles.page}>
        <ToolPageHeader id="simple-pomodoro-timer" />
        <div className={styles.introduction}>
          <span className={styles.introMark} aria-hidden="true">25 / 5</span>
          <p>
            Focus for 25 minutes, reset for 5, and repeat. Add an intention for
            the session, start the timer, and let the rhythm do the rest.{" "}
            <a
              href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
              target="_blank"
              rel="noopener noreferrer"
            >
              About the technique <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>

        <div className={styles.workspace}>
          <section
            className={styles.timerPanel}
            data-mode={activeTab}
            aria-label={`${sessionLabel} timer`}
          >
            <div className={styles.modeTabs} role="tablist" aria-label="Timer mode">
              {[WORK, BREAK].map(tab => {
                const isActive = activeTab === tab;
                const isRunning = runningType === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.modeTab} ${isActive ? styles.modeTabActive : ""}`}
                    onClick={() => handleTabChange(tab)}
                  >
                    <span>{tab === WORK ? "Focus" : "Break"}</span>
                    <span className={styles.modeDuration}>
                      {tab === WORK ? "25 min" : "5 min"}
                    </span>
                    {isRunning && <span className={styles.runningDot} aria-label="Running" />}
                  </button>
                );
              })}
            </div>

            <div className={styles.timerStage}>
              <div
                className={styles.timerRing}
                style={{ "--timer-progress": `${timerProgress}deg` }}
              >
                <div className={styles.timerFace}>
                  <span className={styles.status}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    {timerStatus}
                  </span>
                  <time
                    className={styles.time}
                    aria-label={`${minutes} minutes and ${seconds} seconds remaining`}
                  >
                    {minutes}:{seconds}
                  </time>
                  <span className={styles.sessionLabel}>{sessionLabel}</span>
                </div>
              </div>
            </div>

            <div className={styles.timerDetails}>
              <div>
                <span>Current</span>
                <strong>{activeTab === WORK ? "25 min focus" : "5 min reset"}</strong>
              </div>
              <div>
                <span>Up next</span>
                <strong>{nextLabel} · {nextDuration}</strong>
              </div>
            </div>

            <button
              type="button"
              className={styles.soundButton}
              aria-pressed={isAudioEnabled}
              onClick={toggleAudio}
            >
              <TimerIcon name={isAudioEnabled ? "volume" : "volume-off"} />
              <span>Completion sound {isAudioEnabled ? "on" : "off"}</span>
            </button>

            <div className={styles.controls}>
              {showStart && (
                <button
                  type="button"
                  onClick={startTimer}
                  className={styles.primaryButton}
                >
                  <TimerIcon name="play" />
                  Start {activeTab === WORK ? "focus" : "break"}
                </button>
              )}

              {showPauseResume && (
                <>
                  <button
                    type="button"
                    onClick={pauseResume}
                    className={styles.primaryButton}
                  >
                    <TimerIcon name={isPaused ? "play" : "pause"} />
                    {isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelTimer}
                    className={styles.secondaryButton}
                  >
                    <TimerIcon name="reset" />
                    Reset
                  </button>
                </>
              )}
            </div>
          </section>

          <aside className={styles.notesPanel} aria-labelledby="session-intention-title">
            <div className={styles.panelHeading}>
              <span className={styles.panelEyebrow}>Before you begin</span>
              <h2 id="session-intention-title">Set your intention</h2>
              <p>A small, specific goal makes it easier to stay with the session.</p>
            </div>

            <label className={styles.noteLabel} htmlFor="pomodoro-session-note">
              What will you focus on?
            </label>
            <textarea
              id="pomodoro-session-note"
              ref={textareaRef}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              rows={8}
              className={styles.noteInput}
              placeholder="For example: finish the project report, review a pull request, or practise algorithms."
            />

            <div className={styles.noteFooter}>
              <span>Saved locally when the session ends</span>
              <span>{noteInput.length} characters</span>
            </div>
          </aside>
        </div>

        <section className={styles.historySection} aria-labelledby="session-history-title">
          <div className={styles.historyHeader}>
            <div>
              <span className={styles.panelEyebrow}>Your progress</span>
              <h2 id="session-history-title">Session history</h2>
            </div>
            <span className={styles.historyCount}>
              {notes.length} {notes.length === 1 ? "session" : "sessions"}
            </span>
          </div>

          {notes.length === 0 ? (
            <div className={styles.emptyHistory}>
              <span aria-hidden="true">◎</span>
              <div>
                <strong>No completed sessions yet</strong>
                <p>Your locally saved focus notes will appear here.</p>
              </div>
            </div>
          ) : (
            <ol className={styles.historyList}>
              {notes.map((note, index) => (
                <li className={styles.historyItem} key={note.ts}>
                  <span className={styles.historyIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <time dateTime={new Date(note.ts).toISOString()}>
                    {dateFormatter(note.ts)}
                  </time>
                  <p>{note.text}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      </article>
    </Layout>
  );
}
