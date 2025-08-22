import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import DEFAULT_CONFIG from '../../config/default_config';
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import { projectsList}  from "../../config/projectsList";

const getMetaData = () => {
  return projectsList.filter((p) => p.id === 'simple-pomodoro-timer')[0] || {};
}

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

  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <meta name="title" content={ meta.title } />
        <meta name="description" content={ meta.description } />

        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
        <meta property="og:image" content={ meta.imageUrl } />
        <meta property="og:url" content={ `${DEFAULT_CONFIG.baseUrl}/projects/simple-pomodoro-timer` } />
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

      <article>
        <h2 className={utilStyles.headingLg}>Pomodoro Timer</h2>
        <div className="mb-6">
        The Pomodoro Technique is a time-management method where you work in 25-minute intervals, or "pomodoros," 
        followed by short 5-minute breaks. After completing four pomodoros, you take a longer 15-30 minute break 
        to help improve focus, reduce procrastination, and prevent burnout. The technique, developed by 
        Francesco Cirillo, uses a timer (originally a tomato-shaped kitchen timer) to structure work into manageable chunks
          (<a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">Wikipedia</a>).
        </div>
        {/* Time display and textarea two-column container */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "flex-start" }}>
          {/* Left column: tabs, timer & controls */}
          <div style={{ flex: "1 1 300px", textAlign: "center" }}>
            {/* Tabs */}
            <div style={{ display: "flex", marginBottom: "2rem", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
              {[WORK, BREAK].map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  style={{
                    flex: 1,
                    padding: "1rem",
                    background: activeTab === tab ? "#4169e1" : "#f8fafc",
                    color: activeTab === tab ? "white" : "#64748b",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    fontSize: "1rem"
                  }}
                  className="p-2"
                >
                  {tab === WORK ? "Timer" : "Break"}
                  {runningType === tab && (
                    <span style={{ marginLeft: 8, fontSize: "0.9rem" }}>▶</span>
                  )}
                </button>
              ))}
            </div>

            {/* Time display */}
            <div style={{
              fontSize: "5rem",
              fontWeight: "700",
              textAlign: "center",
              margin: "1rem 1rem",
              color: "#334155",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              fontFamily: "monospace"
            }} className="mt-0">
              {minutes}:{seconds}
            </div>

            {/* Subtle audio toggle button */}
            <div style={{ 
              marginBottom: "2rem",
              textAlign: "center"
            }}>
              <button
                onClick={toggleAudio}
                style={{
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.8rem",
                  background: "transparent",
                  color: isAudioEnabled ? "#10b981" : "#6b7280",
                  border: `1px solid ${isAudioEnabled ? "#10b981" : "#6b7280"}`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "400",
                  transition: "all 0.2s ease",
                  opacity: 0.8
                }}
                onMouseOver={(e) => {
                  e.target.style.opacity = "1";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = "0.8";
                  e.target.style.transform = "scale(1)";
                }}
              >
                {isAudioEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
              </button>
            </div>

            {/* Control buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              {showStart && (
                <button
                  onClick={startTimer}
                  style={{
                    padding: "1rem 2.5rem",
                    fontSize: "1.1rem",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "600",
                    boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.4)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                >
                  Start
                </button>
              )}

              {showPauseResume && (
                <>
                  <button
                    onClick={pauseResume}
                    style={{
                      padding: "1rem 2.5rem",
                      fontSize: "1.1rem",
                      background: "linear-gradient(135deg, #f97316, #ea580c)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: "600",
                      boxShadow: "0 4px 14px 0 rgba(249, 115, 22, 0.4)",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                    onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    onClick={cancelTimer}
                    style={{
                      padding: "1rem 2.5rem",
                      fontSize: "1.1rem",
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: "600",
                      boxShadow: "0 4px 14px 0 rgba(239, 68, 68, 0.4)",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                    onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right column: notes textarea */}
          <div style={{ flex: "1 1 200px" }} className="h-max">
            <div style={{ 
              background: "white", 
              padding: "2rem 2rem 3rem 2rem", 
              borderRadius: "16px", 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              border: "1px solid #e2e8f0"
            }}>
              <h3 style={{ 
                marginTop: 0, 
                marginBottom: "1rem", 
                fontSize: "1.25rem", 
                fontWeight: "700",
                color: "#1e293b"
              }}>
                Plan your focus time
                <br/>
                <span style={{ fontWeight: "500", fontSize: "1rem", color: "#64748b" }}>
                  Note what you will work on during this session
                </span>
              </h3>
              <textarea
                ref={textareaRef} // Add ref to textarea
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                rows={6}
                style={{ 
                  width: "100%", 
                  padding: "1rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  resize: "vertical",
                  transition: "border-color 0.2s ease"
                }}
                placeholder="e.g., Finish project report, coding, learning, practice algorithms, etc."
                className="border rounded-md p-2 w-full mt-4 text-gray-800"
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>
          </div>
        </div>
        
        {/* Notes history */}
        <div className="mt-16">
          <h3 className="text-lg font-bold" style={{ color: "white", marginBottom: "1rem" }}>
            Session History
          </h3>
          {notes.length > 0 && (
            <div style={{ 
              background: "white", 
              padding: "1.5rem", 
              borderRadius: "12px", 
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0"
            }}>
              {notes.map((n, i) => (
                <div key={n.ts} style={{ 
                  display: "flex", 
                  gap: "1rem", 
                  marginBottom: "0.75rem",
                  padding: "0.75rem",
                  background: i % 2 === 0 ? "#f8fafc" : "transparent",
                  borderRadius: "8px",
                  fontSize: "0.95rem"
                }}>
                  <span style={{ 
                    fontWeight: "600", 
                    color: "#64748b",
                    minWidth: "2rem"
                  }}>
                    {i+1}.
                  </span>
                  <span style={{ 
                    whiteSpace: "nowrap", 
                    color: "#64748b",
                    fontSize: "0.9rem",
                    minWidth: "200px"
                  }}>
                    {dateFormatter(n.ts)}
                  </span>
                  <span style={{ color: "#1e293b", fontWeight: "500" }}>
                    {n.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}
