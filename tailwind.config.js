/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#eaf0ec',
        bg2: '#e5e2da',
        textDark: '#2a332e',
        textMuted: '#798a81',
        accent: '#b55f26',
        clayDark: '#0a0a0a',
        clayLight: '#f0f2f5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'clay': '8px 10px 20px rgba(0, 0, 0, 0.08), -8px -10px 20px rgba(255, 255, 255, 0.8), inset 2px 2px 5px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(0, 0, 0, 0.04)',
        'clay-hover': '12px 14px 28px rgba(0, 0, 0, 0.12), -10px -12px 24px rgba(255, 255, 255, 0.9), inset 2px 2px 6px rgba(255, 255, 255, 0.7), inset -2px -2px 6px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
