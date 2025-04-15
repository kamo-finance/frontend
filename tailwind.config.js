import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        extend: 'light',
        colors: {
          background: '#E8E3CA',
          foreground: {
            DEFAULT: '#291603',
            50: '#EAE5CE',
            100: '#DCD4AE',
            200: '#CEC38E',
            300: '#C0B26E',
            400: '#B2A14D',
            500: '#91843F',
            600: '#716631',
            700: '#514923',
            800: '#302C15',
            900: '#100F07'
          },
          primary: {
            DEFAULT: '#218143',
            foreground: '#ffffff',
            50: '#C8F1D6',
            100: '#A3E7BB',
            200: '#7EDE9F',
            300: '#59D484',
            400: '#34CB69',
            500: '#2BA656',
            600: '#218143',
            700: '#185C30',
            800: '#0E371D',
            900: '#05120A'
          },
          secondary: {
            DEFAULT: '#02AAFD',
            foreground: '#ffffff',
            50: '#E8F7FF',
            100: '#BAE8FF',
            200: '#8CD8FE',
            300: '#30B9FE',
            400: '#02AAFD',
            500: '#018BCF',
            600: '#016CA1',
            700: '#014D73',
            800: '#002E45',
            900: '#000F17'
          },
          focus: {
            DEFAULT: '#2E1505'
          }
        }
      }
    }
  })],
};

export default config;
