/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enable dark mode with class
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans files in src/
    theme: {
      extend: {},
    },
    plugins: [],
  };
  