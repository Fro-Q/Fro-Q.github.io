/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/.vitepress/theme/Layout.vue",
    "./docs/.vitepress/theme/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "selector",
};
