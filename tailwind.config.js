/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FAFCFE",
        dark: "#0E0E0E",
        primary: "#EDF3FF",
        secondary: "#1BBD66",
        highlight: "#FE9F59",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
