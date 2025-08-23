import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import DEFAULT_CONFIG from '../../config/default_config';
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import { projectsList } from "../../config/projectsList";

const getMetaData = () => {
  return projectsList.filter((p) => p.id === 'typing-speed-test')[0] || {};
}

const TEXT_SAMPLES = [
  // 1. The Solar System
  "The solar system consists of the Sun and everything that orbits it, including eight planets, their moons, dwarf planets, asteroids, and comets. The Sun contains more than 99% of the solar system’s mass. Mercury is the closest planet to the Sun, while Neptune is the farthest. Earth is the only planet known to support life. Jupiter is the largest planet, with a diameter of about 143,000 kilometers. Saturn is famous for its beautiful rings. The asteroid belt lies between Mars and Jupiter. Pluto, once considered the ninth planet, is now classified as a dwarf planet. The Kuiper Belt and Oort Cloud contain many icy bodies and comets.",

  // 2. The Human Brain
  "The human brain is an incredibly complex organ, weighing about 1.4 kilograms. It contains approximately 86 billion neurons, each forming thousands of connections. The brain is divided into two hemispheres, left and right, which control opposite sides of the body. The cerebrum is responsible for higher functions like reasoning and memory. The cerebellum coordinates movement and balance. The brainstem controls vital functions such as breathing and heart rate. Neurotransmitters like dopamine and serotonin influence mood and behavior. The brain consumes about 20% of the body’s energy. Learning new skills strengthens neural pathways. Sleep is essential for memory consolidation.",

  // 3. The History of Flight
  "The history of flight began with the dream of human-powered flight. In 1903, the Wright brothers achieved the first powered, controlled flight in Kitty Hawk, North Carolina. Their aircraft, the Wright Flyer, flew for 12 seconds. Aviation rapidly advanced, with Charles Lindbergh making the first solo nonstop transatlantic flight in 1927. The jet engine revolutionized air travel in the 20th century. Commercial aviation made global travel accessible. The Concorde, a supersonic passenger jet, flew from 1976 to 2003. Today, drones and unmanned aerial vehicles are used for various purposes. Spaceflight began in 1961 with Yuri Gagarin’s orbit. Mars missions are now being planned.",

  // 4. The Water Cycle
  "The water cycle describes how water moves through Earth’s atmosphere, surface, and underground. It begins with evaporation, where the Sun heats water in oceans, lakes, and rivers, turning it into vapor. This vapor rises and cools, forming clouds through condensation. When clouds become heavy, precipitation occurs as rain, snow, sleet, or hail. Some water infiltrates the ground, replenishing aquifers. Plants release water vapor through transpiration. Runoff carries water back to rivers and oceans. The water cycle is essential for life, regulating climate and supporting ecosystems. Human activities, like deforestation and pollution, can disrupt the cycle. Conservation helps maintain water resources.",

  // 5. The Internet
  "The Internet is a global network connecting millions of computers and devices. It began as ARPANET in the late 1960s, funded by the U.S. Department of Defense. The World Wide Web, invented by Tim Berners-Lee in 1989, made information easily accessible. Today, over 5 billion people use the Internet. It enables communication through email, social media, and video calls. E-commerce allows businesses to sell products worldwide. Cloud computing provides storage and services online. Cybersecurity is crucial to protect data. The Internet of Things connects everyday objects. Streaming services deliver music and video. The Internet continues to transform society and economies.",

  // 6. Renewable Energy
  "Renewable energy comes from sources that are naturally replenished, such as sunlight, wind, water, and geothermal heat. Solar panels convert sunlight into electricity. Wind turbines harness the power of moving air. Hydroelectric dams generate energy from flowing water. Geothermal plants use heat from within the Earth. Biomass energy is produced from organic materials. Renewable energy reduces greenhouse gas emissions and dependence on fossil fuels. In 2021, renewables provided nearly 29% of global electricity. Costs for solar and wind power have dropped significantly. Governments offer incentives for clean energy. Transitioning to renewables is vital for combating climate change and ensuring a sustainable future.",

  // 7. The Amazon Rainforest
  "The Amazon rainforest is the largest tropical rainforest on Earth, covering over 5.5 million square kilometers. It spans nine countries, with most of it in Brazil. The Amazon is home to about 390 billion individual trees and over 16,000 species. It provides habitat for millions of plants, animals, and insects. The rainforest produces 20% of the world’s oxygen. Indigenous peoples have lived in the Amazon for thousands of years. Deforestation threatens biodiversity and contributes to climate change. Conservation efforts aim to protect the forest and its inhabitants. The Amazon River, the world’s largest by discharge, flows through the heart of the rainforest.",

  // 8. The Great Wall of China
  "The Great Wall of China is one of the world’s most famous structures, stretching over 21,000 kilometers. Construction began in the 7th century BC and continued for centuries. The wall was built to protect Chinese states from invasions. It is made of stone, brick, tamped earth, and other materials. Watchtowers and fortresses were added for defense. The wall traverses mountains, deserts, and grasslands. It is a UNESCO World Heritage Site. Millions of workers, including soldiers and prisoners, built the wall. The Great Wall is a symbol of China’s history and strength. Tourists from around the world visit its preserved sections.",

  // 9. The Oceans
  "Earth’s oceans cover about 71% of the planet’s surface and contain 97% of its water. There are five main oceans: Pacific, Atlantic, Indian, Southern, and Arctic. The Pacific Ocean is the largest and deepest, with the Mariana Trench reaching nearly 11,000 meters. Oceans regulate climate by absorbing heat and carbon dioxide. They are home to millions of species, from tiny plankton to giant whales. Coral reefs are vital marine ecosystems. Oceans provide food, transportation, and recreation. Pollution, overfishing, and climate change threaten ocean health. Marine conservation efforts include protected areas and sustainable fishing. The oceans are essential for life on Earth.",

  // 10. The History of Mathematics
  "Mathematics has a rich history dating back thousands of years. Ancient Egyptians used geometry for building pyramids. The Babylonians developed a base-60 number system. Greek mathematicians like Euclid and Pythagoras made significant contributions. The concept of zero originated in India. Islamic scholars preserved and expanded mathematical knowledge during the Middle Ages. The Renaissance saw advances in algebra and calculus, with figures like Newton and Leibniz. Mathematics underpins science, engineering, and technology. Statistics help analyze data. Cryptography secures digital communication. Modern mathematics explores abstract concepts and real-world problems. Mathematical discoveries continue to shape our understanding of the universe."
];

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export default function TypingSpeedTestPage() {
  const meta = getMetaData();

  // Core state
  const [sampleIndex, setSampleIndex] = useState(() => Math.floor(Math.random() * TEXT_SAMPLES.length));
  const [target, setTarget] = useState(TEXT_SAMPLES[sampleIndex]);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Metrics state
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);


  // Timing refs
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // History
  const [sessions, setSessions] = useState([]);
  const LS_KEY = "typing_test_sessions";

  // Derived
  const elapsedSeconds = useMemo(() => 60 - timeLeft, [timeLeft]);
  const minutes = Math.max(1e-9, elapsedSeconds / 60); // avoid divide by zero
  const typedChars = typed.length;
  const realTimeWPM = useMemo(() => Math.round((correctChars / 5) / minutes || 0), [correctChars, minutes]);
  const accuracy = useMemo(() => {
    if (typedChars === 0) return 100;
    return Math.round((correctChars / Math.max(1, typedChars)) * 100);
  }, [correctChars, typedChars]);

  // Completed word count (used for Overall WPM metric at end)
  const completedWordCount = useMemo(() => {
    const endsWithSpace = /\s$/.test(typed);
    const t = typed.trim();
    const all = t.length ? t.split(/\s+/) : [];
    return endsWithSpace ? all.length : Math.max(0, all.length - 1);
  }, [typed]);

  // Load sessions
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(LS_KEY) : null;
      if (raw) setSessions(JSON.parse(raw));
    } catch (_) {}
  }, []);

  const persistSessions = (list) => {
    setSessions(list);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch (_) {}
    }
  };

  // Handle timer lifecycle
  useEffect(() => {
    if (!started) return;
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setStarted(false);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [started]);

  // Recalculate correctness on typed change
  useEffect(() => {
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === target[i]) correct++; else incorrect++;
    }
    setCorrectChars(correct);
    setIncorrectChars(incorrect);
  }, [typed, target]);

  // When finished, compute and store session
  useEffect(() => {
    if (!finished) return;
    const result = computeResults();
    const updated = [result, ...sessions].slice(0, 100);
    persistSessions(updated);
  }, [finished]);

  const computeResults = () => {
    const wordsTarget = target.trim().split(/\s+/);
    const endsWithSpace = /\s$/.test(typed);
    const typedTrim = typed.trim();
    const wordsTypedAll = typedTrim.length ? typedTrim.split(/\s+/) : [];
    const completedWordCount = endsWithSpace ? wordsTypedAll.length : Math.max(0, wordsTypedAll.length - 1);
    let rightWords = 0;
    let wrongWords = 0;
    for (let i = 0; i < completedWordCount; i++) {
      if (wordsTarget[i] === undefined) break;
      if (wordsTypedAll[i] === wordsTarget[i]) rightWords++; else wrongWords++;
    }
    const minutesTaken = Math.max(1e-9, elapsedSeconds / 60);
    const wpm = Math.round((correctChars / 5) / minutesTaken);
    const acc = typedChars === 0 ? 100 : Math.round((correctChars / Math.max(1, typedChars)) * 100);
    const overallWPM = completedWordCount; // total completed words in 60s session
    return {
      ts: Date.now(),
      sampleIndex,
      wpm,
      overallWPM,
      accuracy: acc,
      rightWords,
      wrongWords,
      correctChars,
      incorrectChars,
      typedChars,
      duration: elapsedSeconds
    };
  };

  const resetTest = (newSample = false) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const nextIndex = newSample ? Math.floor(Math.random() * TEXT_SAMPLES.length) : sampleIndex;
    setSampleIndex(nextIndex);
    setTarget(TEXT_SAMPLES[nextIndex]);
    setTyped("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(60);
    setCorrectChars(0);
    setIncorrectChars(0);
    startTimeRef.current = null;
  };

  const startTest = () => {
    if (started) return;
    setFinished(false);
    setStarted(true);
    startTimeRef.current = Date.now();
  };

  const handleTyping = (e) => {
    if (!started || finished) return;
    const value = e.target.value;
    // Limit input length to target length to simplify diff/highlight
    const limited = value.slice(0, target.length);
    setTyped(limited);
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

  // Rendering helpers - windowed view of words (10 previous, current, next 19 = max 30 words)
  const renderWindowedTarget = () => {
    const targetWords = useMemo(() => target.trim().split(/\s+/), [target]);
    const typedTrimmed = typed.trim();
    const typedWholeWordsArr = typedTrimmed.length ? typedTrimmed.split(/\s+/) : [];

    // Determine current word and partial
    const endsWithSpace = /\s$/.test(typed);
    const segments = typed.length ? typed.split(/\s+/) : [];
    const typedFullWords = endsWithSpace ? (typedTrimmed.length ? typedWholeWordsArr.length : 0) : Math.max(0, segments.length - 1);
    const currentPartial = endsWithSpace ? '' : (segments[segments.length - 1] || '');
    const currentWordIndex = typedFullWords; // index user is typing now

    const windowStart = Math.max(0, currentWordIndex - 5);
    const windowEnd = Math.min(targetWords.length, currentWordIndex + 25);

    const pieces = [];
    for (let i = windowStart; i < windowEnd; i++) {
      const word = targetWords[i] || '';
      if (i < typedWholeWordsArr.length) {
        // Already completed words
        const correct = typedWholeWordsArr[i] === word;
        pieces.push(
          <span key={`w-${i}`} style={{
            color: correct ? '#22c55e' : '#ef4444',
            background: correct ? 'transparent' : 'rgba(239,68,68,0.10)',
            textShadow: correct ? '0 0 8px rgba(34,197,94,0.35)' : '0 0 8px rgba(239,68,68,0.35)'
          }}>
            {word}
          </span>
        );
      } else if (i === currentWordIndex) {
        // Current word with per-char highlight
        const chars = [];
        for (let j = 0; j < word.length; j++) {
          const typedCh = currentPartial[j];
          const correct = typedCh != null && typedCh === word[j];
          const seen = typedCh != null;
          chars.push(
            <span key={`c-${i}-${j}`} style={{
              color: seen ? (correct ? '#22c55e' : '#ef4444') : '#e5e7eb',
              background: seen && !correct ? 'rgba(239,68,68,0.10)' : 'transparent',
              textShadow: seen ? (correct ? '0 0 8px rgba(34,197,94,0.35)' : '0 0 8px rgba(239,68,68,0.35)') : 'none'
            }}>
              {word[j]}
            </span>
          );
        }
        // Blinking caret after partial
        if (started && !finished) {
          chars.splice(clamp(currentPartial.length, 0, word.length), 0, (
            <span key={`caret-${i}`} style={{
              display: 'inline-block',
              width: 2,
              height: '1.2em',
              background: '#60a5fa',
              boxShadow: '0 0 10px rgba(96,165,250,0.8)',
              marginRight: 2,
              transform: 'translateY(2px)'
            }} />
          ));
        }
        pieces.push(<span key={`w-${i}`} className="text-gray-900 dark:text-gray-100">{chars}</span>);
      } else {
        // Upcoming words
        pieces.push(
          <span key={`w-${i}`} className="text-gray-500 dark:text-gray-400">
            {word}
          </span>
        );
      }

      // Space between words
      if (i < windowEnd - 1) pieces.push(<span key={`s-${i}`}> </span>);
    }
    return pieces;
  };

  const ResultsPanel = () => {
    const r = computeResults();
    return (
      <div className="rounded-2xl p-6 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-sky-500/60 shadow-sm dark:shadow-[0_20px_50px_-20px_rgba(14,165,233,0.35)] bg-white dark:bg-gradient-to-b dark:from-gray-900/80 dark:to-slate-950/90">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon="flag" label="Overall WPM" value={r.overallWPM} accent="from-emerald-500 to-emerald-600" />
          <MetricCard icon="target" label="Accuracy" value={`${r.accuracy}%`} accent="from-sky-400 to-sky-500" />
          <MetricCard icon="check" label="Right Words" value={r.rightWords} accent="from-violet-400 to-violet-500" />
          <MetricCard icon="x" label="Wrong Words" value={r.wrongWords} accent="from-red-500 to-rose-500" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <MiniMetric label="Correct Chars" value={r.correctChars} />
          <MiniMetric label="Incorrect Chars" value={r.incorrectChars} />
          <MiniMetric label="Typed Chars" value={r.typedChars} />
        </div>
      </div>
    );
  };

  const Icon = ({ name, className }) => {
    const cls = className || "h-5 w-5";
    switch (name) {
      case 'clock':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cls}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6l4 2" />
          </svg>
        );
      case 'gauge':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cls}>
            <path d="M5 19a9 9 0 1 1 14 0" />
            <path d="M12 13l4-4" />
          </svg>
        );
      case 'flag':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cls}>
            <path d="M4 21V5" />
            <path d="M4 5h10l-1.5 3H20l-1.5 3H4" />
          </svg>
        );
      case 'target':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cls}>
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="1" />
          </svg>
        );
      case 'check':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cls}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12l3 3 5-6" />
          </svg>
        );
      case 'x':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cls}>
            <circle cx="12" cy="12" r="9" />
            <path d="M9 9l6 6M15 9l-6 6" />
          </svg>
        );
      default:
        return null;
    }
  };

  const MetricCard = ({ label, value, accent, icon }) => {
    const hasAccent = !!accent;
    const containerClass = hasAccent
      ? `group rounded-xl p-4 text-center border border-transparent shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br ${accent} transform-gpu transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:rotate-[0.5deg]`
      : `group rounded-xl p-4 text-center border bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow dark:shadow-[0_10px_30px_-12px_rgba(2,6,23,0.55)] transform-gpu transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:rotate-[0.5deg]`;
    const valueClass = hasAccent
      ? `text-3xl font-extrabold text-white`
      : `text-3xl font-extrabold text-gray-900 dark:text-gray-100`;
    const labelClass = hasAccent
      ? `text-sm text-white/90 flex items-center justify-center gap-2`
      : `text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2`;
    const iconClass = hasAccent
      ? 'h-4 w-4 text-white/90 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-translate-y-0.5'
      : 'h-4 w-4 text-gray-400 dark:text-gray-400 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-translate-y-0.5';
    return (
      <div className={containerClass}>
        <div className={valueClass}>{value}</div>
        <div className={labelClass}>
          {icon ? <Icon name={icon} className={iconClass} /> : null}
          {label}
        </div>
      </div>
    );
  };

  const MiniMetric = ({ label, value }) => (
    <div className="rounded-lg p-3 text-center border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <meta name="title" content={ meta.title } />
        <meta name="description" content={ meta.description } />

        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
        <meta property="og:image" content={ meta.imageUrl } />
        <meta property="og:url" content={ `${DEFAULT_CONFIG.baseUrl}/projects/typing-speed-test` } />
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
        <h2 className={utilStyles.headingLg}>Typing Speed Test</h2>

        {/* Top metrics and controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <MetricCard icon="clock" label="Time Left" value={`${timeLeft}s`} />
          <MetricCard icon="gauge" label="Realtime WPM" value={realTimeWPM} />
          <MetricCard icon="flag" label="Overall WPM" value={completedWordCount} />
          <MetricCard icon="target" label="Accuracy" value={`${accuracy}%`} />
        </div>

        {/* Target text - windowed view (10 typed, 20 upcoming) */}
        <div className="mt-8 p-6 rounded-2xl border border-gray-800 bg-gradient-to-tr from-slate-900/90 to-slate-950/90 shadow-[0_20px_60px_-25px_rgba(59,130,246,0.35)] text-slate-200 font-mono leading-8 text-[1.05rem]">
          {renderWindowedTarget()}
        </div>

        {/* Input and actions */}
        <div className="grid grid-cols-1 gap-4 mt-4">
          <textarea
            value={typed}
            onChange={handleTyping}
            disabled={!started || finished}
            rows={5}
            className="w-full px-5 py-4 rounded-xl border border-gray-800 bg-white/5 dark:bg-white/5 text-gray-900 dark:text-gray-100 text-base outline-none focus:ring-2 focus:ring-sky-400/50"
            placeholder={started ? 'Start typing the text above…' : 'Click Start to begin a 60s test…'}
          />

          <div className="flex gap-3 flex-wrap">
            {!started && !finished && (
              <button
                onClick={startTest}
                className="px-5 py-3 rounded-xl text-white font-bold shadow-[0_12px_40px_-12px_rgba(34,197,94,0.5)] bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
              >Start</button>
            )}

            {started && !finished && (
              <button
                onClick={() => resetTest(false)}
                className="px-5 py-3 rounded-xl text-white font-bold shadow-[0_12px_40px_-12px_rgba(245,158,11,0.45)] bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >Restart</button>
            )}

            {finished && (
              <>
                <button
                  onClick={() => resetTest(false)}
                  className="px-5 py-3 rounded-xl text-white font-bold shadow-[0_12px_40px_-12px_rgba(14,165,233,0.5)] bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                >Try Again</button>
                <button
                  onClick={() => resetTest(true)}
                  className="px-5 py-3 rounded-xl text-white font-bold shadow-[0_12px_40px_-12px_rgba(167,139,250,0.5)] bg-gradient-to-br from-violet-400 to-violet-600 hover:from-violet-500 hover:to-violet-700"
                >New Sample</button>
              </>
            )}

            {!started && !finished && (
              <button
                onClick={() => resetTest(true)}
                className="px-5 py-3 rounded-xl text-white font-bold shadow-[0_12px_40px_-12px_rgba(100,116,139,0.45)] bg-gradient-to-br from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800"
              >Randomize</button>
            )}
          </div>
        </div>

        {/* Results */}
        {finished && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Results</h3>
            <ResultsPanel />
          </div>
        )}

        {/* Session History */}
        <div className="mt-12">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Session History</h3>
          {sessions.length > 0 && (
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 dark:bg-white/5">
              {sessions.map((s, i) => (
                <div key={s.ts} className={`grid grid-cols-5 gap-3 px-4 py-3 border-b border-slate-900/60 ${i % 2 === 0 ? 'bg-slate-900/60' : 'bg-transparent'}`}>
                  <div className={`${i % 2 === 0 ? 'text-gray-200' : 'text-gray-700'} dark:text-gray-400`}>{dateFormatter(s.ts)}</div>
                  <div className="text-gray-900 dark:text-gray-100 font-semibold">Overall WPM: {s.overallWPM != null ? s.overallWPM : s.wpm}</div>
                  <div className="text-sky-400">Accuracy: {s.accuracy}%</div>
                  <div className="text-violet-300">Right: {s.rightWords}</div>
                  <div className="text-rose-400">Wrong: {s.wrongWords}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}
