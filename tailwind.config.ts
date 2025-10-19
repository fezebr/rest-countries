/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class", // enable dark mode using 'class'
    theme: {
      extend: {
        colors: {
          "dark-blue": "#1e2a38",
          "very-dark-blue-bg": "#151f2a",
          "very-dark-blue-text": "#12171c",
          "dark-gray": "#858585",
          "very-light-gray": "#fafafa",
          white: "#ffffff",
        },
      },
    },
    plugins: [],
  };
  