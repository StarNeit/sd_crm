/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true
      },
      borderRadius: {
        xl: '10px'
      },
      colors: {
        primary: {
          DEFAULT: '#EB498A',
          700: '#BC53A5'
        },
        secondary: {
          DEFAULT: 'rgb(76, 194, 244)',
          700: 'rgb(97, 149, 220)',
        },
        info: {
          DEFAULT: 'rgb(134, 93, 193)',
          700: 'rgb(92, 74, 186)'
        },
        warning: {
          DEFAULT: 'rgb(254, 182, 46)',
          700: 'rgb(246, 129, 89)'
        },
        grey: {
          900: '#101828'
        },
      }
    },
    boxShadow: {
      card: 'inset 0 1px 0 0 hsl(0deg 0% 100% / 5%)'
    }
  },
  important: '#tailwind',
  plugins: []
};
