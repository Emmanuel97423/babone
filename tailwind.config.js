/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html, js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      display: ['Oswald'],
      body: ['Open Sans', 'sans-serif']
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem'
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#207BFF',

          secondary: '#4EA5FF',

          accent: '#4EA5FF',

          neutral: '#2C3333',

          'base-100': '#2A303C',

          info: '#3ABFF8',

          success: '#4BB543',

          warning: '#FBBD23',

          error: '#F87272',

          'table-grey': '#262B36'
        }
      }
    ]
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
