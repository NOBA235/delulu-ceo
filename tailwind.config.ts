import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F4F5F0",
        foreground: "#191C1A",
        muted: "#72796F",
        accent: {
          DEFAULT: "#006C4C",
          hover: "#00533A",
          light: "#E6F4EA",
          tonal: "#89F8C7",
        },
        card: {
          DEFAULT: "#FFFFFF",
          border: "#E2E5DC",
        },
        m3: {
          surface: "#F4F5F0",
          "surface-container": "#ECEEE6",
          "surface-container-high": "#E6E8E0",
          "surface-container-highest": "#E0E3DA",
          "surface-container-low": "#F0F2EA",
          primary: "#006C4C",
          "on-primary": "#FFFFFF",
          "primary-container": "#89F8C7",
          "on-primary-container": "#002114",
          "secondary-container": "#D3E8D8",
          "on-secondary-container": "#0E1F18",
          tertiary: "#386663",
          outline: "#72796F",
          "outline-variant": "#C2C9BD",
          "on-surface": "#191C1A",
          "on-surface-variant": "#414942",
          error: "#BA1A1A",
          "error-container": "#FFDAD6",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-google-sans)",
          "Google Sans",
          "Plus Jakarta Sans",
          "Roboto",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        "3xl": "28px",
        "4xl": "36px",
      },
    },
  },
  plugins: [],
};

export default config;

