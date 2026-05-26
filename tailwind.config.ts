import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        mono:    ["var(--font-ibm-mono)", "Courier New", "monospace"],
        sans:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        green: {
          50:  "#F2FBF7",
          100: "#E1F5EE",
          200: "#9FE1CB",
          400: "#4DC08A",
          600: "#1D9E75",
          700: "#1D6B4A",
          800: "#1D4E3A",
          900: "#0D3D2B",
        },
        gold: {
          100: "#FDF3D0",
          400: "#E9A800",
          500: "#C48B0A",
          700: "#8A6200",
        },
        red: {
          100: "#FCEBEB",
          600: "#A32D2D",
          800: "#6B1212",
        },
        blue: {
          100: "#E6F1FB",
          600: "#1A5CB0",
          800: "#0A2D5C",
        },
        ink: {
          DEFAULT: "#0E1011",
          80:  "#1C2226",
          60:  "#3A4248",
          40:  "#6B7A82",
          20:  "#A8B4BB",
          10:  "#D4DBDE",
          5:   "#F0F3F4",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "14px",
        xl: "22px",
        "2xl": "32px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,.08)",
        md: "0 4px 16px rgba(0,0,0,.10)",
        lg: "0 12px 40px rgba(0,0,0,.14)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        pulse2: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.4" },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.5s ease both",
        "fade-up-1":  "fade-up 0.5s 0.1s ease both",
        "fade-up-2":  "fade-up 0.5s 0.2s ease both",
        "fade-up-3":  "fade-up 0.5s 0.3s ease both",
        "pulse2":     "pulse2 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
