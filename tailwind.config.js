/** @type {import('tailwindcss').Config} */
export default {
  // where Tailwind looks for classes
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // use 'class' so you control dark mode with a `.dark` class on <html> or <body>
  darkMode: "class",

  theme: {
    extend: {
      // gradients (light + dark variants)
      backgroundImage: {
        "premium-blue": "linear-gradient(135deg, #4f46e5, #0ea5e9)",
        "premium-gold": "linear-gradient(135deg, #fbbf24, #f59e0b)",
        "premium-dark": "linear-gradient(135deg, #1e1b4b, #3b0764)",
        "glass-white": "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
        "premium-blue-dark": "linear-gradient(135deg, #0f172a, #3730a3)",
        "premium-gold-dark": "linear-gradient(135deg, #2b2b2b, #7c4a00)",
        "glass-dark": "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.25))",
      },

      // color tokens for light and dark usage
      colors: {
        // Light theme tokens
        primary: "#6366f1",     // Indigo
        secondary: "#0ea5e9",   // Sky Blue
        accent: "#f43f5e",      // Rose Red
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#ef4444",
        dark: "#0f172a",
        // Dark theme tokens (prefixed with 'dm-' for clarity; used with `dark:dm-*` utilities)
        "dm-primary": "#818cf8",
        "dm-secondary": "#38bdf8",
        "dm-surface": "#0b1220",
        "dm-muted": "#94a3b8",
        "dm-accent": "#fb7185",
        "dm-glow": "#7c3aed",
      },

      // shadows to suit both themes
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.15)",
        soft: "0 4px 20px rgba(0,0,0,0.08)",
        deep: "0 8px 20px rgba(0,0,0,0.25)",
        "glass-dark": "0 10px 30px rgba(2,6,23,0.6)",
      },

      // modern fonts
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      // subtle radii and spacing tokens for premium look
      borderRadius: {
        xl2: "1rem",
        "card": "1.25rem",
      },

      // small token for backdrop blur when using glassmorphism
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
    },
  },

  // add variants to ensure dark: applies where needed
  variants: {
    extend: {
      backgroundImage: ["responsive", "hover", "dark"],
      boxShadow: ["dark", "hover", "focus"],
      textColor: ["dark", "hover", "focus"],
      backgroundColor: ["dark", "hover", "focus"],
      borderColor: ["dark", "focus"],
      ringColor: ["dark", "focus"],
    },
  },

  // helpful plugins — uncomment install if you want them:
  plugins: [
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/aspect-ratio"),
  ],
};
