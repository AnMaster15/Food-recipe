const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Primary Colors (Dark Theme)
        primary: {
          50: 'rgb(23 23 23)',
          100: 'rgb(38 38 38)',
          200: 'rgb(64 64 64)',
          300: 'rgb(82 82 82)',
          400: 'rgb(115 115 115)',
          500: 'rgb(163 163 163)',
          600: 'rgb(212 212 212)',
          700: 'rgb(229 229 229)',
          800: 'rgb(245 245 245)',
          900: 'rgb(250 250 250)',
        },
        // Accent Colors (Dark Theme)
        accent: {
          50: 'rgb(23 23 23)',
          100: 'rgb(38 38 38)',
          200: 'rgb(64 64 64)',
          300: 'rgb(82 82 82)',
          400: 'rgb(115 115 115)',
          500: 'rgb(163 163 163)',
          600: 'rgb(212 212 212)',
          700: 'rgb(229 229 229)',
          800: 'rgb(245 245 245)',
          900: 'rgb(250 250 250)',
        },
        // Success Colors (Dark Theme)
        success: {
          50: 'rgb(23 23 23)',
          100: 'rgb(38 38 38)',
          200: 'rgb(64 64 64)',
          300: 'rgb(82 82 82)',
          400: 'rgb(115 115 115)',
          500: 'rgb(163 163 163)',
          600: 'rgb(212 212 212)',
          700: 'rgb(229 229 229)',
          800: 'rgb(245 245 245)',
          900: 'rgb(250 250 250)',
        },
        // Warning Colors (Dark Theme)
        warning: {
          50: 'rgb(23 23 23)',
          100: 'rgb(38 38 38)',
          200: 'rgb(64 64 64)',
          300: 'rgb(82 82 82)',
          400: 'rgb(115 115 115)',
          500: 'rgb(163 163 163)',
          600: 'rgb(212 212 212)',
          700: 'rgb(229 229 229)',
          800: 'rgb(245 245 245)',
          900: 'rgb(250 250 250)',
        },
        // Error Colors (Dark Theme)
        error: {
          50: 'rgb(23 23 23)',
          100: 'rgb(38 38 38)',
          200: 'rgb(64 64 64)',
          300: 'rgb(82 82 82)',
          400: 'rgb(115 115 115)',
          500: 'rgb(163 163 163)',
          600: 'rgb(212 212 212)',
          700: 'rgb(229 229 229)',
          800: 'rgb(245 245 245)',
          900: 'rgb(250 250 250)',
        },
        // Neutral Colors (Dark Theme)
        neutral: {
          50: 'rgb(23 23 23)',
          100: 'rgb(38 38 38)',
          200: 'rgb(64 64 64)',
          300: 'rgb(82 82 82)',
          400: 'rgb(115 115 115)',
          500: 'rgb(163 163 163)',
          600: 'rgb(212 212 212)',
          700: 'rgb(229 229 229)',
          800: 'rgb(245 245 245)',
          900: 'rgb(250 250 250)',
        },
      },
      animation: {
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        aurora: "aurora 60s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { 
            opacity: '0',
            transform: "translateY(20px)"
          },
          to: { 
            opacity: '1',
            transform: "translateY(0)"
          },
        },
        scaleIn: {
          from: { 
            opacity: '0',
            transform: "scale(0.9)"
          },
          to: { 
            opacity: '1',
            transform: "scale(1)"
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
