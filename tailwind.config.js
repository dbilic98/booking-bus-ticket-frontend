/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "major-mono": ["Major Mono Display", "monospace"],
    },
    extend: {
      colors: {
        "light-gray": "#E0E1DD",
      },
    },
  },
  plugins: [],
};
