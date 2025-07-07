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
    },
  },
  plugins: [],
};
