import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        dark: 'inset 0 -350px 460px 640px rgb(24 24 27)',
        light: 'inset 0 -350px 460px 640px rgb(255 255 255)'
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;
