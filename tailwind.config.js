/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#019267', // Forest Green
          light: '#02b17c',
          dark: '#017351',
        },
        secondary: {
          DEFAULT: '#111111', // Black/Dark Gray for headings
          light: '#333333',
          dark: '#000000',
        },
        accent: {
          DEFAULT: '#019267', // Using primary as accent too
          light: '#DEEFDC', // Pale Mint
          dark: '#017351',
        },
        muted: {
          DEFAULT: '#666666', // Gray for body text
          light: '#999999',
        },
        success: {
          DEFAULT: '#019267',
          light: '#DEEFDC',
          dark: '#017351',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          dark: '#1E293B',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Reference Site Pastel Backgrounds
        peach: '#F5E9E2',
        mint: '#DEEFDC',
        sky: '#E2EAF5',
        cream: '#EBF2D5',
      },
      fontFamily: {
        heading: ['Roboto', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1450px',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'bounce-slow': 'bounce 4s infinite ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'premium': '0 0 10px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(1, 146, 103, 0.2)',
      }
    },
  },
  plugins: [],
}

