import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    colors: {
      "black": {
        'a900': "#0D0F10",
        800: "#0F1112",
        700: "#141517",
        600: "#17181A",
        500: "#1E1F21",
        400: "#27292B",
        300: "#2D2E30",
        200: "#373838",
        100: "#A0A0A0",
      },
      "teste": {
        900: "#ADB3BA",
        800: "#BDC2C7",
        700: "#C9CDD1",
        600: "#D9DBDE",
        500: "#E3E4E5",
        400: "#EBECED",
        300: "#F0F1F2",
        200: "#FAFAFA",
        100: "#FFFFFF",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
