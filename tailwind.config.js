/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#1a2236', // dark blue/gray
        accent: '#ff6b6b',  // coral red
        secondary: '#232946', // slightly lighter dark
        background: '#f4f4f6', // light background
        card: '#232946',
        text: '#eaeaea',
        muted: '#b8c1ec',
        // Tailwind v4: add only the colors you use
        gray: require('tailwindcss/colors').gray,
        blue: require('tailwindcss/colors').blue,
        red: require('tailwindcss/colors').red,
        yellow: require('tailwindcss/colors').yellow,
      },
    },
  },
  plugins: [],
};
