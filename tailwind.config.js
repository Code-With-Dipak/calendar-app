/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#fef8ea',
          100: '#fef3d0',
          200: '#fde68a',
        },
        calendar: {
          bg: '#fdf4e7',
          border: '#e8d4a3',
          text: '#4a3f2e',
          selected: '#fbbf24',
          range: '#fef3c7',
          today: '#ef4444',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'calendar': '0 10px 25px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        'paper': '0 4px 20px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
