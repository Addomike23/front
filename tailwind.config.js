// tailwind.config.js
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Background colors (add more as needed)
    'bg-gray-900', 'bg-orange-500', 'bg-green-500',
    
    // Text colors
    'text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500',

    // Text alignment
    'text-left', 'text-center', 'text-right',

    // Font weights
    'font-bold', 'font-semibold', 'font-light',

    // Flex/grid alignment
    'justify-center', 'justify-between', 'items-center',

    // Display helpers
    'hidden', 'block', 'inline-block', 'flex', 'grid',

    // Borders
    'border', 'border-gray-300', 'border-red-500',

    // Hover effects
    'hover:bg-red-500', 'hover:text-white',

    // Padding/Margin utilities
    'p-2', 'p-4', 'p-6', 'm-2', 'm-4', 'mt-2', 'mb-2',

    // Width/Height
    'w-full', 'h-full', 'w-1/2', 'h-1/2',

    // Rounded corners
    'rounded', 'rounded-lg', 'rounded-full',

    // Shadows
    'shadow', 'shadow-md', 'shadow-lg',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
