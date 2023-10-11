/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#333",
        },
        extended: {
          DEFAULT: "#0B0A12",
          100: "#FCFC",
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
        "3/4": "75%",
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
