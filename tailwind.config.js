/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mushaf: {
          green: {
            DEFAULT: '#1a4d2e',
            dark: '#0f2819',
            light: '#2a6e40',
          },
          gold: {
            DEFAULT: '#d4af37',
            light: '#ffd700',
            dark: '#b8941e',
          },
          cream: {
            DEFAULT: '#f5f1e8',
            dark: '#e8e4d9',
          },
          sepia: {
            DEFAULT: '#f4ecd8',
            dark: '#e6dcc4',
          },
        },
      },
      fontFamily: {
        arabic: ['Traditional Arabic', 'Arabic Typesetting', 'Arial', 'sans-serif'],
      },
      transitionDuration: {
        '800': '800ms',
      },
    },
  },
  plugins: [],
};
