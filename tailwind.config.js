/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import animation from "tailwindcss-animation";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DOSGothic", "sans-serif"],
      },
      colors: {
        primary: "#CDB544",
        secondary: "#721C3A",
        "gray-white": "#D0D0D0",
        "gray-light": "#5E5F63",
        "gray-basic": "#001a00",
        "gray-dark": "#001200",
        basic: "#33ff33",
      },
      fontSize: {
        "head-medium": ["3rem", { fontWeight: "700" }],
        "body-medium": ["2.0rem", { fontWeight: "600" }],
        "body-small": ["2rem", { fontWeight: "200" }],
      },
    },
  },
  plugins: [typography, animation],
};
