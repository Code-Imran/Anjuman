/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        crimson: {
          DEFAULT: '#8b1d2c',
          dark: '#721522',
          light: '#fdf2f3',
        },
        navy: {
          DEFAULT: '#0d1b2a',
          dark: '#081018',
          light: '#1b263b',
        },
      },
    },
  },
  plugins: [],
};