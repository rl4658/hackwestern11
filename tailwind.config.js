module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files in the src directory
    "./public/index.html", // Include your HTML file
  ],
  theme: {
    extend: {
      maxWidth: {
        "280px": "280px",
      },
    },
  },
  plugins: [],
};
