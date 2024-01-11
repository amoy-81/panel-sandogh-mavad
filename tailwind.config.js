/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#F99D27",
      secondary: "#1C75BC",
      gray: "#8B8B8B",
      titlesColor : "#1D1929",
      p: {
        1: "#FFF9F2",
        2: "#FFEBD0",
        3: "#FCCE93",
        4: "#FBBE6F",
        5: "#FAAD4B",
        6: "#CF8321",
        7: "#A6691A",
      },
      s: {
        1: "#E8F0F8",
        2: "#D4E6F4",
        3: "#8DBADD",
        4: "#68A3D2",
        5: "#428CC7",
        6: "#17629D",
        7: "#134E7D",
      },
      g: {
        1: "#E5E5E5",
        2: "#D4D4D4",
        3: "#BEBEBE",
        4: "#9D9D9D",
        5: "#7F7F7F",
        6: "#595959",
        7: "#3B3B3B",
      },
      backColor : "#0D294E",
      redColor : '#B9393A',

      // default
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      gray: colors.slate,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      blue : colors.blue,
      green : colors.green,
      red : colors.red

    },
  },
  plugins: [],
};
