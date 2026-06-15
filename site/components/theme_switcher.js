import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function isTheme(value) {
  return value === DARK_THEME || value === LIGHT_THEME;
}

function getStoredTheme() {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch (_) {
    return null;
  }
}

function getSystemTheme(mediaQuery) {
  return mediaQuery.matches ? DARK_THEME : LIGHT_THEME;
}

function applyTheme(theme) {
  const root = document.documentElement;

  root.classList.remove("theme-dark", "theme-light");
  root.classList.add(`theme-${theme}`);
  root.style.colorScheme = theme;
}

export default function ThemeSwitcher({ className = "" }) {
  const [theme, setTheme] = useState(LIGHT_THEME);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_QUERY);

    const syncTheme = () => {
      const nextTheme = getStoredTheme() || getSystemTheme(mediaQuery);
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    syncTheme();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncTheme);
      return () => mediaQuery.removeEventListener("change", syncTheme);
    }

    mediaQuery.addListener(syncTheme);
    return () => mediaQuery.removeListener(syncTheme);
  }, []);

  const nextTheme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

  const handleToggle = () => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (_) {
      // The class update below still gives the user the theme switch for this page view.
    }

    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-gray-500 transition-colors duration-150 hover:border-sky-300 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/50 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100 ${className}`}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      onClick={handleToggle}
    >
      {theme === DARK_THEME ? (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3z" />
        </svg>
      )}
    </button>
  );
}
