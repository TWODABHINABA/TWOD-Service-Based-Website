// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Adjust based on your project
  theme: {
    extend: {
      colors: {
        primary: 'rgb(64, 23, 79)',      
        secondary: 'rgb(181, 108, 150)',   
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
