// tailwind.config.js
module.exports = {
  purge: [
    // Use *.tsx if using TypeScript
    "./pages/**/*.js",
    "./components/**/*.js",
  ],
  variants: {
    borderColor: ["responsive", "hover", "focus", "active", "group-hover"],
    // borderWidth: ["responsive", "hover", "focus"],
  },
  // ...
};
