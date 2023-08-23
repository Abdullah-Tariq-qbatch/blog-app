module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '25ch' },
        },
      },
      animation: {
        typing: 'typing 3s steps(25)',
      },
    },
  },
  plugins: [],
};
