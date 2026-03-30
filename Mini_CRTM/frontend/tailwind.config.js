/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08111f',
        mist: '#eef6ff',
        accent: '#14b8a6',
        gold: '#f59e0b',
      },
      boxShadow: {
        glow: '0 18px 50px rgba(8, 17, 31, 0.18)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(20, 184, 166, 0.25), transparent 35%), radial-gradient(circle at bottom right, rgba(245, 158, 11, 0.18), transparent 30%)',
      },
    },
  },
  plugins: [],
};
