/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "head-gradient":
          "linear-gradient(0deg,rgba(146, 249, 252, 1) 0%, rgba(255, 255, 255, 1) 98%)",
      },
    },
  },
  plugins: [],
};
