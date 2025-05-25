import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

export default {
  darkMode: 'media',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        overlay: 'var(--overlay)',
        textColor: 'var(--textColor)',
        hover: 'var(--hover)',
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
