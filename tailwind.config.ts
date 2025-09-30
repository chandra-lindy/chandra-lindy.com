import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-merriweather-sans)'],
        mono: ['var(--font-inconsolata)'],
        serif: ['var(--font-merriweather-sans)'],
      },
    },
  },
  plugins: [typography],
};

export default config;
