import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f7f1e8",
        ink: "#11211d",
        clay: "#c4683b",
        forest: "#21493d",
        sand: "#e6cba8",
        stone: "#6f6a61"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Trebuchet MS", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(17, 33, 29, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
