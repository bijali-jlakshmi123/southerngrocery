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
          DEFAULT: '#EF6C00',
          light: '#FFB74D',
          dark: '#E65100',
        },
        secondary: {
          DEFAULT: '#D32F2F',
          light: '#FF5252',
          dark: '#B71C1C',
        },
        accent: {
          DEFAULT: '#1976D2',
          light: '#42A5F5',
          dark: '#0D47A1',
        },
        success: {
          DEFAULT: '#388E3C',
          light: '#66BB6A',
          dark: '#1B5E20',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          dark: '#1E293B',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        heading: ['var(--font-outfit)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
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
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(239, 108, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

