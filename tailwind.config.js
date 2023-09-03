/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "slate-1000": "#020409",
      },
      ringWidth: {
        '10': '10px',
      }
    },
    fontFamily: {
      sans: [
        "Inter",
        "Avenir Next",
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Ubuntu",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
      display: ["Cal Sans", "Inter", "sans-serif"],
    },
  },
  plugins: [],
  content: [
    `assets/**/*.css`,
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
};
