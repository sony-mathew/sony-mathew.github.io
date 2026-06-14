import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import DEFAULT_CONFIG from '../../config/default_config';
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import { projectsList } from "../../config/projectsList";

const LENGTH_PRESETS = [8, 16, 32, 64];
const MAX_LENGTH = 4096;

const CHARACTER_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  special: "!@#$%^&*()-_=+[]{};:,.?/"
};

const HEX_SET = "0123456789abcdef";

const getMetaData = () => {
  return projectsList.filter((p) => p.id === 'password-generator')[0] || {};
}

const clampLength = (value) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 1;
  return Math.min(MAX_LENGTH, Math.max(1, parsed));
};

const getSecureRandomInt = (maxExclusive) => {
  const cryptoApi = globalThis.crypto;
  if (!cryptoApi?.getRandomValues) {
    throw new Error("Secure random generator is unavailable in this browser.");
  }

  const randomRange = 0x100000000;
  const limit = Math.floor(randomRange / maxExclusive) * maxExclusive;
  const values = new Uint32Array(1);

  do {
    cryptoApi.getRandomValues(values);
  } while (values[0] >= limit);

  return values[0] % maxExclusive;
};

const randomCharacterFrom = (characters) => {
  return characters[getSecureRandomInt(characters.length)];
};

const shuffleCharacters = (characters) => {
  const shuffled = [...characters];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = getSecureRandomInt(index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.join("");
};

const buildCharacterPool = (options) => {
  return Object.entries(options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => CHARACTER_SETS[key])
    .join("");
};

const generateSecret = ({ length, options, useHexDigest }) => {
  const activeSets = Object.entries(options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => CHARACTER_SETS[key]);
  const pool = useHexDigest ? HEX_SET : buildCharacterPool(options);

  if (!pool) {
    throw new Error("Choose at least one character type.");
  }

  const requiredCharacters = useHexDigest
    ? []
    : activeSets.slice(0, length).map(randomCharacterFrom);
  const remainingLength = Math.max(0, length - requiredCharacters.length);
  const generated = [...requiredCharacters];

  for (let index = 0; index < remainingLength; index++) {
    generated.push(randomCharacterFrom(pool));
  }

  return shuffleCharacters(generated);
};

export default function PasswordGeneratorPage() {
  const meta = getMetaData();

  const [length, setLength] = useState(32);
  const [customLength, setCustomLength] = useState("32");
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true
  });
  const [useHexDigest, setUseHexDigest] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [copyState, setCopyState] = useState("Copy");

  const activePreset = LENGTH_PRESETS.includes(length) ? length : "custom";

  const entropyBits = useMemo(() => {
    const poolSize = useHexDigest ? HEX_SET.length : buildCharacterPool(options).length;
    if (!poolSize) return 0;
    return Math.round(length * Math.log2(poolSize));
  }, [length, options, useHexDigest]);

  const regenerate = () => {
    setCopyState("Copy");
    setError("");

    try {
      setPassword(generateSecret({ length, options, useHexDigest }));
    } catch (generationError) {
      setPassword("");
      setError(generationError.message || "Could not generate password.");
    }
  };

  useEffect(() => {
    regenerate();
  }, [length, options, useHexDigest]);

  const selectPreset = (preset) => {
    setLength(preset);
    setCustomLength(String(preset));
  };

  const updateCustomLength = (value) => {
    setCustomLength(value);
    setLength(clampLength(value));
  };

  const toggleOption = (key) => {
    setOptions((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  const copyPassword = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopyState("Copied");
      setTimeout(() => setCopyState("Copy"), 1500);
    } catch (_) {
      setCopyState("Select");
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
        <meta property="og:url" content={ `${DEFAULT_CONFIG.baseUrl}/projects/password-generator` } />
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

      <article>
        <h2 className={utilStyles.headingLg}>Password Generator</h2>

        <div className="mt-6 rounded-lg border border-gray-800 bg-gray-950/40 p-5">
          <label className="block text-sm font-semibold text-gray-300" htmlFor="generated-password">
            Generated password
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <textarea
              id="generated-password"
              value={password}
              readOnly
              rows={4}
              className="min-h-[120px] w-full resize-y rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 font-mono text-lg text-sky-200 outline-none focus:ring-2 focus:ring-sky-400/50"
            />
            <button
              type="button"
              onClick={copyPassword}
              className="h-12 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              {copyState}
            </button>
            <button
              type="button"
              onClick={regenerate}
              className="h-12 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Generate
            </button>
          </div>

          {error && (
            <div className="mt-3 rounded-md border border-rose-900 bg-rose-950/40 px-3 py-2 text-sm text-rose-300">
              {error}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-400">
            <span>Length: {length}</span>
            <span>Entropy: {entropyBits} bits</span>
            {useHexDigest && <span>Hex digest</span>}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-lg border border-gray-800 bg-gray-950/40 p-5">
            <h3 className="text-lg font-semibold text-gray-100">Length</h3>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {LENGTH_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => selectPreset(preset)}
                  className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                    activePreset === preset
                      ? "border-sky-400 bg-sky-600 text-white"
                      : "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <label className="mt-5 block text-sm font-semibold text-gray-300" htmlFor="custom-length">
              Custom length
            </label>
            <input
              id="custom-length"
              type="number"
              min="1"
              max={MAX_LENGTH}
              value={customLength}
              onChange={(event) => updateCustomLength(event.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-lg text-gray-100 outline-none focus:ring-2 focus:ring-sky-400/50"
            />
          </section>

          <section className="rounded-lg border border-gray-800 bg-gray-950/40 p-5">
            <h3 className="text-lg font-semibold text-gray-100">Characters</h3>
            <div className="mt-4 grid gap-3">
              {[
                ["uppercase", "Uppercase"],
                ["lowercase", "Lowercase"],
                ["numbers", "Numbers"],
                ["special", "Special characters"]
              ].map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-4 py-3"
                >
                  <span className="text-sm font-semibold text-gray-200">{label}</span>
                  <input
                    type="checkbox"
                    checked={options[key]}
                    disabled={useHexDigest}
                    onChange={() => toggleOption(key)}
                    className="h-5 w-5 accent-sky-500"
                  />
                </label>
              ))}
            </div>

            <label className="mt-5 flex items-center justify-between rounded-lg border border-emerald-900 bg-emerald-950/30 px-4 py-3">
              <span className="text-sm font-semibold text-emerald-100">Hex digest</span>
              <input
                type="checkbox"
                checked={useHexDigest}
                onChange={() => setUseHexDigest((current) => !current)}
                className="h-5 w-5 accent-emerald-500"
              />
            </label>
          </section>
        </div>
      </article>
    </Layout>
  );
}
