// tailwind.config.js
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-1": "#333",
      },
      // fontSize: {
      //   sm: ["14px", "20px"],
      //   base: ["16px", "24px"],
      //   lg: ["20px", "28px"],
      //   xl: ["24px", "32px"],
      // },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
    },
  },
  variants: {
    borderColor: ["responsive", "hover", "focus", "active"],
    borderWidth: ["responsive", "hover", "focus"],
    gap: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
