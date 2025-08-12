import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inconsolata)'],
        mono: ['var(--font-inconsolata)'],
        serif: ['var(--font-inconsolata)'],
      },
    },
  },
  plugins: [],
};

export default config;
