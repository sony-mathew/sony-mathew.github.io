import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import DEFAULT_CONFIG from '../../config/default_config';
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import { projectsList } from "../../config/projectsList";

const getMetaData = () => {
  return projectsList.filter((p) => p.id === 'scientific-calculator')[0] || {};
}

// Math helpers
const factorial = (n) => {
  const x = Math.floor(Number(n));
  if (!isFinite(x) || x < 0) return NaN;
  if (x === 0 || x === 1) return 1;
  let acc = 1;
  for (let i = 2; i <= x; i++) acc *= i;
  return acc;
};

// Build a safe evaluator using a tiny preprocessor and Function sandbox
const buildEvaluator = (angleMode) => {
  // Trig helpers honoring angle mode
  const sinFn = (x) => angleMode === 'DEG' ? Math.sin(x * Math.PI / 180) : Math.sin(x);
  const cosFn = (x) => angleMode === 'DEG' ? Math.cos(x * Math.PI / 180) : Math.cos(x);
  const tanFn = (x) => angleMode === 'DEG' ? Math.tan(x * Math.PI / 180) : Math.tan(x);
  const asinFn = (x) => angleMode === 'DEG' ? (Math.asin(x) * 180 / Math.PI) : Math.asin(x);
  const acosFn = (x) => angleMode === 'DEG' ? (Math.acos(x) * 180 / Math.PI) : Math.acos(x);
  const atanFn = (x) => angleMode === 'DEG' ? (Math.atan(x) * 180 / Math.PI) : Math.atan(x);

  // Whitelisted bindings we expose to the evaluator
  const bindings = {
    sin: sinFn,
    cos: cosFn,
    tan: tanFn,
    asin: asinFn,
    acos: acosFn,
    atan: atanFn,
    ln: Math.log,
    log: Math.log10,
    sqrt: Math.sqrt,
    abs: Math.abs,
    ceil: Math.ceil,
    floor: Math.floor,
    round: Math.round,
    exp: Math.exp,
    pow: Math.pow,
    min: Math.min,
    max: Math.max
  };
  const allowedNames = new Set([...Object.keys(bindings), 'PI', 'E', 'factorial']);

  // Compose regex once
  const identRegex = /([a-zA-Z_][a-zA-Z0-9_]*)/g;

  return (rawExpression) => {
    try {
      if (rawExpression == null || String(rawExpression).trim() === '') return '';
      let s = String(rawExpression);

      // Normalize symbols
      s = s.replace(/π/g, 'PI');
      s = s.replace(/×/g, '*').replace(/÷/g, '/');
      s = s.replace(/√/g, 'sqrt');
      // Replace percentage: number% => (number/100)
      s = s.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

      // Replace factorial n! with factorial(n). Support nested parentheses or numbers
      // Handle multiple occurrences by looping until no more ! remain
      const factorialPattern = /(\))!|(\d+(?:\.\d+)?)!/g;
      while (/(\)|\d)!/g.test(s)) {
        s = s.replace(factorialPattern, (match, parenGroup, numGroup, offset) => {
          if (parenGroup) {
            // Find matching '(' for this ')'
            let idx = offset - 1; // index of ')'
            let depth = 0;
            for (let i = idx; i >= 0; i--) {
              const ch = s[i];
              if (ch === ')') depth++;
              else if (ch === '(') {
                depth--;
                if (depth === 0) {
                  const inside = s.slice(i, idx + 1); // ( ... )
                  return `factorial${inside}`;
                }
              }
            }
            return match; // fallback
          } else if (numGroup) {
            return `factorial(${numGroup})`;
          }
          return match;
        });
      }

      // Power operator ^ -> **
      s = s.replace(/\^/g, '**');

      // Guard: Only allow a safe set of characters after our replacements
      const allowed = /^[0-9+\-*/()., **%\sA-Za-z_]+$/;
      if (!allowed.test(s)) {
        throw new Error('Unsupported characters in expression');
      }

      // Support Euler's constant: standalone 'e' -> 'E', but keep scientific notation 1e-3 intact
      s = s.replace(/\be\b/g, 'E');

      // Validate that only allowed identifiers are present
      const tokens = s.match(identRegex) || [];
      for (const t of tokens) {
        if (!allowedNames.has(t)) {
          // Allow numeric notation parts like Infinity/NaN if user typed them
          if (t === 'Infinity' || t === 'NaN') continue;
          throw new Error(`Unknown identifier: ${t}`);
        }
      }

      // Last safety: disallow obvious dangerous globals/constructors
      const forbidden = /(window|document|globalThis|global|Function|constructor|process|require|import|XMLHttpRequest|eval)/;
      if (forbidden.test(s)) throw new Error('Expression not allowed');

      // Build function with whitelisted bindings only
      const paramNames = [...Object.keys(bindings), 'PI', 'E', 'factorial'];
      const fn = new Function(...paramNames, `"use strict"; return (${s});`);
      const args = [...Object.values(bindings), Math.PI, Math.E, factorial];
      const val = fn(...args);
      if (typeof val === 'number') {
        if (!isFinite(val)) return '∞';
        return val;
      }
      return val;
    } catch (e) {
      throw e;
    }
  };
};

export default function ScientificCalculatorPage() {
  const meta = getMetaData();

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isScientific, setIsScientific] = useState(true);
  const [angleMode, setAngleMode] = useState('DEG'); // 'DEG' | 'RAD'
  const [memory, setMemory] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    // Autofocus input for keyboard typing
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const evaluate = () => {
    setError("");
    try {
      const evalFn = buildEvaluator(angleMode);
      const out = evalFn(expression);
      if (typeof out === 'number') {
        setResult(String(out));
      } else {
        setResult(String(out));
      }
    } catch (e) {
      setError(e.message || 'Invalid expression');
    }
  };

  const appendToken = (token) => {
    setExpression((prev) => prev + token);
    setError("");
    if (inputRef.current) inputRef.current.focus();
  };

  const clearAll = () => {
    setExpression("");
    setResult("");
    setError("");
    if (inputRef.current) inputRef.current.focus();
  };

  const deleteOne = () => {
    setExpression((prev) => prev.slice(0, -1));
    setError("");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      evaluate();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      clearAll();
    }
  };

  const formatResult = useMemo(() => {
    if (result === '' || result == null) return '';
    const num = Number(result);
    if (!isNaN(num)) {
      // Keep reasonable precision
      const rounded = Math.round((num + Number.EPSILON) * 1e12) / 1e12;
      return String(rounded);
    }
    return String(result);
  }, [result]);

  // Memory operations
  const memoryClear = () => setMemory(0);
  const memoryRecall = () => appendToken(String(memory));
  const memoryAdd = () => {
    try {
      const evalFn = buildEvaluator(angleMode);
      const out = evalFn(expression || result || '0');
      const n = Number(out);
      if (!isNaN(n)) setMemory((m) => m + n);
    } catch (_) {}
  };
  const memorySubtract = () => {
    try {
      const evalFn = buildEvaluator(angleMode);
      const out = evalFn(expression || result || '0');
      const n = Number(out);
      if (!isNaN(n)) setMemory((m) => m - n);
    } catch (_) {}
  };

  const renderButton = (label, onClick, opts = {}) => {
    const { variant } = opts;
    const base = "px-4 py-3 rounded-lg font-semibold text-sm focus:outline-none transition-transform transform-gpu hover:-translate-y-0.5";
    let cls = `${base} bg-gray-800 text-gray-100 border border-gray-700`;
    if (variant === 'accent') cls = `${base} text-white bg-gradient-to-br from-sky-500 to-blue-600`;
    if (variant === 'warn') cls = `${base} text-white bg-gradient-to-br from-rose-500 to-red-600`;
    if (variant === 'ok') cls = `${base} text-white bg-gradient-to-br from-emerald-500 to-emerald-600`;
    return (
      <button onClick={onClick} className={cls} key={label} aria-label={`key-${label}`}>
        {label}
      </button>
    );
  };

  const metaData = meta;

  return (
    <Layout>
      <Head>
        <title>{metaData.title}</title>
        <meta name="title" content={ metaData.title } />
        <meta name="description" content={ metaData.description } />

        <meta property="og:title" content={ metaData.title } />
        <meta property="og:description" content={ metaData.description } />
        <meta property="og:image" content={ metaData.imageUrl } />
        <meta property="og:url" content={ `${DEFAULT_CONFIG.baseUrl}/projects/scientific-calculator` } />
        <meta property="og:site_name" content={ DEFAULT_CONFIG.siteTitle } />

        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={ metaData.date } />
        <meta property="article:author" content={ metaData.author } />
        <meta property="article:tag" content={ metaData.tags } />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ metaData.title } />
        <meta name="twitter:description" content={ metaData.description } />
        <meta name="twitter:creator" content={ `@${DEFAULT_CONFIG.authorTwitterHandle}` } />
        <meta name="twitter:image" content={ metaData.imageUrl } />
        <meta name="twitter:image:alt" content={ metaData.title } />
      </Head>

      <article>
        <h2 className={utilStyles.headingLg}>Scientific Calculator</h2>
        <div className="mt-3 text-gray-300">
          A simple yet powerful calculator with scientific functions. Type with your keyboard and press Enter to evaluate.
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <div className="inline-flex overflow-hidden rounded-lg border border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-semibold ${!isScientific ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-300'}`}
              onClick={() => setIsScientific(false)}
            >Simple</button>
            <button
              className={`px-4 py-2 text-sm font-semibold ${isScientific ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-300'}`}
              onClick={() => setIsScientific(true)}
            >Scientific</button>
          </div>

          {isScientific && (
            <div className="inline-flex overflow-hidden rounded-lg border border-gray-700 ml-2">
              <button
                className={`px-3 py-2 text-xs font-semibold ${angleMode === 'DEG' ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-300'}`}
                onClick={() => setAngleMode('DEG')}
              >DEG</button>
              <button
                className={`px-3 py-2 text-xs font-semibold ${angleMode === 'RAD' ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-300'}`}
                onClick={() => setAngleMode('RAD')}
              >RAD</button>
            </div>
          )}

          {/* Memory controls */}
          <div className="inline-flex overflow-hidden rounded-lg border border-gray-700 ml-2">
            <button className="px-3 py-2 text-xs bg-gray-900 text-gray-300" onClick={memoryClear}>MC</button>
            <button className="px-3 py-2 text-xs bg-gray-900 text-gray-300" onClick={memoryRecall}>MR</button>
            <button className="px-3 py-2 text-xs bg-gray-900 text-gray-300" onClick={memoryAdd}>M+</button>
            <button className="px-3 py-2 text-xs bg-gray-900 text-gray-300" onClick={memorySubtract}>M-</button>
          </div>

          <div className="text-xs text-gray-400 ml-2">Memory: {Number(memory.toFixed(10))}</div>
        </div>

        {/* Display */}
        <div className="mt-6 grid gap-3">
          <input
            ref={inputRef}
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type expression… e.g., 2*sin(30)+sqrt(9)"
            className="w-full px-5 py-4 rounded-xl border border-gray-800 bg-white/5 text-gray-400 text-lg outline-none focus:ring-2 focus:ring-sky-400/50 font-mono"
          />
          <div className="min-h-[48px] px-5 py-3 rounded-xl border border-gray-800 bg-gray-900/60 text-sky-300 text-xl font-mono">
            {error ? <span className="text-rose-400">{error}</span> : (formatResult !== '' ? `= ${formatResult}` : '')}
          </div>
        </div>

        {/* Keypad */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Scientific pad */}
          {isScientific && (
            <div className="md:col-span-1 grid grid-cols-4 gap-2 content-start">
              {renderButton('sin', () => appendToken('sin('))}
              {renderButton('cos', () => appendToken('cos('))}
              {renderButton('tan', () => appendToken('tan('))}
              {renderButton('√', () => appendToken('sqrt('))}

              {renderButton('ln', () => appendToken('ln('))}
              {renderButton('log', () => appendToken('log('))}
              {renderButton('x²', () => appendToken('^2'))}
              {renderButton('x³', () => appendToken('^3'))}

              {renderButton('^', () => appendToken('^'))}
              {renderButton('(', () => appendToken('('))}
              {renderButton(')', () => appendToken(')'))}
              {renderButton('!', () => appendToken('!'))}

              {renderButton('π', () => appendToken('PI'))}
              {renderButton('e', () => appendToken('e'))}
              {renderButton('%', () => appendToken('%'))}
              {renderButton('±', () => setExpression((prev) => prev ? (prev.startsWith('-') ? prev.slice(1) : '-' + prev) : prev))}
            </div>
          )}

          {/* Main keypad */}
          <div className={isScientific ? "md:col-span-2" : "md:col-span-3"}>
            <div className="grid grid-cols-4 gap-2">
              {renderButton('CE', clearAll, { variant: 'warn' })}
              {renderButton('DEL', deleteOne, { variant: 'accent' })}
              {renderButton('(', () => appendToken('('))}
              {renderButton(')', () => appendToken(')'))}

              {renderButton('7', () => appendToken('7'))}
              {renderButton('8', () => appendToken('8'))}
              {renderButton('9', () => appendToken('9'))}
              {renderButton('÷', () => appendToken('/'))}

              {renderButton('4', () => appendToken('4'))}
              {renderButton('5', () => appendToken('5'))}
              {renderButton('6', () => appendToken('6'))}
              {renderButton('×', () => appendToken('*'))}

              {renderButton('1', () => appendToken('1'))}
              {renderButton('2', () => appendToken('2'))}
              {renderButton('3', () => appendToken('3'))}
              {renderButton('-', () => appendToken('-'))}

              {renderButton('0', () => appendToken('0'))}
              {renderButton('.', () => appendToken('.'))}
              {renderButton('+', () => appendToken('+'))}
              {renderButton('=', evaluate, { variant: 'ok' })}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          Tips: Use keyboard to type. Supported functions: sin, cos, tan, asin, acos, atan, ln, log, sqrt, abs, floor, ceil, round, exp, min, max. Use ^ for power, ! for factorial, % for percent, π for PI. Trig respects DEG/RAD toggle.
        </div>
      </article>
    </Layout>
  );
}


