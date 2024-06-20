/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "major-mono": ["Major Mono Display", "monospace"],
    },
    extend: {
      colors: {
        cream: "#EBEBE8",
        yellow: "#D1E2C4",
        "jet-black": "#31352E",
      },
    },
  },
  plugins: [],
};
