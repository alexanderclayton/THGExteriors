/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        'background': {
          50: '#f6f4ef',
          100: '#edeade',
          200: '#dbd5bd',
          300: '#c9c09c',
          400: '#b7ab7b',
          500: '#a4965b',
          600: '#847848',
          700: '#635a36',
          800: '#423c24',
          900: '#211e12',
          950: '#100f09',
        },
        'primary': {
          50: '#fbe9ec',
          100: '#f8d3da',
          200: '#f1a7b5',
          300: '#ea7b90',
          400: '#e2506a',
          500: '#db2445',
          600: '#af1d37',
          700: '#84152a',
          800: '#580e1c',
          900: '#2c070e',
          950: '#160407',
        },
        'secondary': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        'accent': {
          50: '#ebf9f9',
          100: '#d7f4f3',
          200: '#b0e8e7',
          300: '#88dddb',
          400: '#61d1cf',
          500: '#39c6c3',
          600: '#2e9e9c',
          700: '#227775',
          800: '#174f4e',
          900: '#0b2827',
          950: '#061414',
        },
       },
    },
  },
  plugins: [],
}

