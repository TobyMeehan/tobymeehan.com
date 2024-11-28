import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        
        'dark-950': '#030712',
        'dark-900': '#111827',
        'dark-850': '#18202F',
        'dark-800': '#1f2937',
        'dark-750': '#2b3440',
        'dark-700': '#374151',
        'dark-600': '#475569',

        'bright': {
          DEFAULT: '#d1d5db',
        },

        'light': {
          DEFAULT: '#9ca3af',
        },

        'link': {
          DEFAULT: '#0284c7',
          hover: '#0369a1'
        },

        'positive': {
          DEFAULT: '#16a34a',
          hover: '#15803d',
          dark: '#166534'
        },
        'negative': {
          DEFAULT: '#dc2626',
          hover: '#b91c1c',
          dark: '#991b1b'
        },
        'cautious': {
          DEFAULT: '#ca8a04',
          hover: '#a16207',
          dark: '#854d0e'
        }
        
      },
    },
  },
  plugins: [],
};
export default config;
