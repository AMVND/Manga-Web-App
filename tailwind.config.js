/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        myShadow1Dark: "4.1px -5px 0 0 rgb(17,24,39)",
        myShadow1White: "4.1px -5px 0 0 rgb(255, 255, 255)",
        myShadow2Dark: "-4.1px -5px 0 0 rgb(17,24,39)",
        myShadow2White: "-4.1px -5px 0 0 rgb(255, 255, 255)",
      },
    },
  },
  plugins: [],
}