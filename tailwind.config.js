/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0D0D10",
        royal: "#4B0082",
        hotpink: "#FF00B8",
        sky: "#008FFF",
        gold: "#FFC857",
        pearl: "#FFFFFF"
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        "synapse-pink": "0 0 44px rgba(255, 0, 184, 0.32)",
        "synapse-blue": "0 0 42px rgba(0, 143, 255, 0.28)",
        "synapse-gold": "0 0 34px rgba(255, 200, 87, 0.24)"
      },
      backgroundImage: {
        "synapse-conic":
          "conic-gradient(from 160deg, #4B0082, #FF00B8, #008FFF, #FFC857, #4B0082)"
      }
    }
  },
  plugins: []
};

module.exports = config;
