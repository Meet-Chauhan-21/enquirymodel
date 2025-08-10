/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.js", // ✅ important for Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // ✅ Flowbite plugin
  ],
}
