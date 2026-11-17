
/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        mall: {
          cream: "#F8F7F4",
          dark: "#171717",
          gold: "#B89A68",
        },
      },
    },
  },
  plugins: [],
};
