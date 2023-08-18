module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '34ch' },
        },
      },
      animation: {
        typing: 'typing 4s steps(34)',
      },
    },
  },
  plugins: [],
};
