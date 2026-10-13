/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#e8f6f7',
          100: '#c1e8eb',
          200: '#9bdde1',
          300: '#6fcdd3',
          400: '#3fb8bf',
          500: '#1ba0a8',
          600: '#0d7e85',
          700: '#0d4a52',
          800: '#093940',
          900: '#062a2f',
        },
        accent: {
          400: '#f5b54a',
          500: '#e8a020',
          600: '#c98a15',
        },
        sand: {
          50: '#fdf9f3',
          100: '#f8eee0',
          200: '#f0dcc4',
        },
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        splash: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideInRight: 'slideInRight 0.3s ease-out',
        scaleIn: 'scaleIn 0.2s ease-out',
        splash: 'splash 1.2s ease-out',
      },
    },
  },
  plugins: [],
};
