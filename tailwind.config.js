module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '2xl': '1.5rem',
      },
      colors: {
        primary: '#2563eb', // blue-600
        accent: '#fbbf24',  // amber-400
        muted: '#f3f4f6',   // gray-100
      },
    },
  },
  plugins: [],
}
