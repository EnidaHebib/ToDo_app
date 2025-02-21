/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4D4D8', // Soft gray for primary elements like navbar
        accent: '#F5F5F5',  // Very light gray for backgrounds
        button: '#A78BFA',  // Muted lavender for buttons
        hover: '#E4E4E7',   // Light gray hover effect
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Adding Poppins font for modern, clean look
      },
    },
  },
  plugins: [daisyui],
}
