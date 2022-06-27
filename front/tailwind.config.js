const { colors } = require("./src/theme/colors");
const { spacing } = require("./src/theme/spacing");
const { screens } = require("./src/theme/screens");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors,
    fontFamily: {
      body: ["proxima-nova", "sans-serif"], // 300 (light)-400 (normal)-600(semibold)-700(bold)
    },
    fontSize: spacing,
    spacing,
    screens,
    extend: {},
  },
  plugins: [],
};
