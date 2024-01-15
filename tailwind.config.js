/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      keyframes: {
        moving: {
          "0%": {left: 0},
          "50%": {right: 0},
          "100%": {left: 0}
        },
        show: {
          "0%": {opacity: 0, top: 50},
          "100%": {opacity: 1, top: 17}
        }
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
