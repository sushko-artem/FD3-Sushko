/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      backgroundImage: {
        "head-gradient":
          "linear-gradient(0deg,rgba(146, 249, 252, 1) 0%, rgba(255, 255, 255, 1) 98%)",
      },
      animation: {
        appearing: "appearing 0.3s ease-in-out alternate",
        blure: "blure 0.3s ease-in-out alternate",
      },
      keyframes: {
        appearing: {
          "0%": { scale: "0" },
          "100%": { scale: "1" },
        },
        blure: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
