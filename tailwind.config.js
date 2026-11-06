/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rangez: {
          black: "#000000",
          pitch: "#050505",
          dark: "#0A0A0C",
          surface: "#111113",
          border: "rgba(255, 255, 255, 0.08)",
          borderSubtle: "rgba(255, 255, 255, 0.04)",
          borderStrong: "rgba(255, 255, 255, 0.18)",
          gold: "#C5A880",
          goldHover: "#B5976D",
          silver: "#E4E4E7",
          muted: "#A1A1AA",
          dimmed: "#71717A",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        micro: "0.28em",
        editorial: "0.22em",
        wideEditorial: "0.32em",
      }
    },
  },
  plugins: [],
}

