/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f4fce8',
          100: '#e5f8c8',
          200: '#caf094',
          300: '#a8e358',
          400: '#8dd42e',
          500: '#75bc1b',
          600: '#5a9613',
          700: '#45730f',
          800: '#305b0b',
          900: '#1e3d07',
        },
        navy: {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
        },
        accent: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        carb: {
          low: '#22c55e',
          medium: '#f59e0b',
          high: '#ef4444',
        },
      },
    },
  },
  plugins: []
}
