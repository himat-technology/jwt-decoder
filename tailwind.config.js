/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        jwt: {
          header: {
            light: '#fecdd3',
            DEFAULT: '#fb7185',
            dark: '#e11d48',
            bg: 'rgba(225, 29, 72, 0.1)',
            border: 'rgba(225, 29, 72, 0.25)',
          },
          payload: {
            light: '#e9d5ff',
            DEFAULT: '#c084fc',
            dark: '#9333ea',
            bg: 'rgba(147, 51, 234, 0.1)',
            border: 'rgba(147, 51, 234, 0.25)',
          },
          signature: {
            light: '#99f6e4',
            DEFAULT: '#2dd4bf',
            dark: '#0d9488',
            bg: 'rgba(13, 148, 136, 0.1)',
            border: 'rgba(13, 148, 136, 0.25)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
