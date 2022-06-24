const { colors } = require("./src/theme/colors");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors,
    extend: {},
  },
  plugins: [],
};
