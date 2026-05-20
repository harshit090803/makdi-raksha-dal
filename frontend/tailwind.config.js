/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mrd: {
          black: '#080808',
          darkest: '#0e0303',
          red: '#8b0000',
          crimson: '#dc143c',
          brightRed: '#ff1e27',
          gray: '#1c1c1e',
          metallic: '#8e8e93',
          lightGray: '#f2f2f7',
        }
      },
      boxShadow: {
        'crimson-glow': '0 0 15px rgba(220, 20, 60, 0.4)',
        'crimson-glow-strong': '0 0 25px rgba(220, 20, 60, 0.75)',
        'metallic-glow': '0 0 15px rgba(142, 142, 147, 0.25)',
      },
      backgroundImage: {
        'cyber-grid': 'radial-gradient(circle, rgba(139, 0, 0, 0.08) 1px, transparent 1px)',
        'red-gradient': 'linear-gradient(to right, #080808, #300000, #080808)',
      },
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', boxShadow: '0 0 15px rgba(220, 20, 60, 0.2)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 30px rgba(220, 20, 60, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
