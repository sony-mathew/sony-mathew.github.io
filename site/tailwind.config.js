/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".theme-dark"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./scripts/**/*.{js,mjs,ts,jsx,tsx}",
    "./daily-news/**/*.md",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      sans: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'monospace'],
    },
    extend: {
      colors: {
        "accent-1": "#1e293b",
        "brand-slate": "#0f172a",
        "brand-blue": "#2563eb",
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
    },
  },
  plugins: [],
};
