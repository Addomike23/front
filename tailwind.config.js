// tailwind.config.js
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'bg-gray-900', 'bg-blue-500', 'bg-green-500','bg-orange-400 // Add all dynamic variants here
    'text-center', 'text-left', 'text-right',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

  
