import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      caption: ["14px", "16px"],
      xs: ["12px", "24px"],
      sm: ["14px", "24px"],
      regular: ["16px", "24px"],
      lg: ["20px", "24px"],
      xl: ["20px", "32px"],
      "2xl": ["24px", "32px"],
      "3xl": ["32px", "40px"],
      "4xl": ["48px", "56px"],
      "6xl": ["64px", "80px"],
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        primaryHover: "var(--primary-hover)",
        foreground: "var(--foreground)",
        error: "var(--error)",
        inputColor: "var(--inputColor)",
        cardColor: "var(--cardColor)",
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
