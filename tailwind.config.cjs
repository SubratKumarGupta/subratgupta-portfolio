/** @type {import('tailwindcss').Config} */

module.exports = {
  // mode: "jit",
  // mode: "jit",
  // purge: [],
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      mobile: { raw: "(orientation: portrait)" },
      desktop: { raw: "(orientation: landscape)" }, //min: "300px", max: "999px" },
    },
    fontFamily: {
      // font-family: "Times New Roman", Times, serif;
      // robotoMono: ["Roboto Mono", "monospace"],
      // robotoSarif: ["Roboto Mono", "monospace", "serif"],
    },
    extend: {
      animation: {
        showClick: "showClick 0.4s ease-in-out forwards",
      },
      keyframes: {
        showClick: {
          "0%": { width: "0px", opacity: 0 },
          "25%": { width: "10%", opacity: 0.4 },
          "50%": { width: "50%", opacity: 1 },
          "100%": { width: "100%", opacity: 1 },
        },
      },
      colors: {
        costom: {
          purpel: {
            100: "#f2e9ff",
            200: "#d9c2ff",
            300: "#c096ff",
            400: "#a46aff",
            500: "#8742ff",
            600: "#5918df", //(original color code)
            700: "#420b73",
          },
          teal: {
            100: "#e0f7f7",
            200: "#b3efef",
            300: "#86e7e7",
            400: "#3fd4d4", //(original color code)
            500: "#2ca8a6",
            600: "#1d7471",
            700: "#10423d",
            800: "#051d1c",
          },
        },
        primary: {
          Dark: "#0e1212",
          purpel: "#5918df",
          teal: "#3fd4d4",
        },

        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        orange: "#f29766",
        yellow: "#f8cd08",
        aridyellow: "#ead76c",
        darkblue: "#031a27",
        gray: "#4b5461",
        lightgray: "#565c6a",
        maroon: "#e15245",
        darkmaroon: "#671c03",
      },
    },
  },
  plugins: [
    // require("postcss-import"),
    // require("tailwindcss"),
    // require("autoprefixer"),
  ],
};
