const { colors } = require("./src/theme/colors");
const { spacing } = require("./src/theme/spacing");
const { screens } = require("./src/theme/screens");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors,
    spacing,
    screens,
    extend: {},
  },
  plugins: [],
};
