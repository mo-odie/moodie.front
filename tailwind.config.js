/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import animation from "tailwindcss-animation";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography, animation],
};
