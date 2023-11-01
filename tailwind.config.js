/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#72BF44",
        },
        secondary: {
          DEFAULT: "#5055A4",
        },
        extended: {
          DEFAULT: "#0B0A12",
          100: "#FCFCFC",
          200: "#F3F3F5",
          300: "#B3B2B8",
          400: "#919097",
          500: "#706E78",
          600: "#504F5A",
          700: "#32313D",
          800: "#171623",
          900: "#0B0A12",
        },
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#ffc82c",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
      },
      backgroundImage: {
        "linear-primary": "linear-gradient(right bottom, #72BF44, #5055A4)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        // sm: "640px",
        // // => @media (min-width: 640px) { ... }

        // md: "768px",
        // // => @media (min-width: 768px) { ... }

        // lg: "1024px",
        // // => @media (min-width: 1024px) { ... }

        // xl: "1280px",
        // // => @media (min-width: 1280px) { ... }

        "2xl": "1441px",
        // => @media (min-width: 1441px) { ... }
        "3xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      maxHeight: {
        "1/2": "75%",
        "9/10": "90%",
      },
      translate: {
        "11/12": "calc(100% * (10 / 12))",
      },
      fontSize: {
        "D-L": "52px",
        "D-M": "40px",
        "D-S": "36px",
        "H-L": "32px",
        "H-M": "28px",
        "H-S": "24px",
        "T-L": "20px",
        "T-M": "18px",
        "T-S": "14px",
        "B-L": "18px",
        "B-M": "16px",
        "B-S": "14px",
      },
      lineHeight: {
        "D-L": "72px",
        "D-M": "52px",
        "D-S": "44px",
        "H-L": "40px",
        "H-M": "36px",
        "H-S": "32px",
        "T-L": "28px",
        "T-M": "24px",
        "T-S": "20px",
        "B-L": "28px",
        "B-M": "24px",
        "B-S": "18px",
      },
      boxShadow: {
        "-md":
          "0 -4px 14px -1px rgb(255 255 255 / 0.1), 0 -2px 10px -2px rgb(255 255 255 / 0.1)",
        "-inner":
          "inset 0 -4px 14px -1px rgb(255 255 255 / 0.1), inset 0 -2px 10px -2px rgb(255 255 255 / 0.1)",
      },
    },
    container: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1440px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
};
