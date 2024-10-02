import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // green: '#3E68B6',
        green: '#6cb7b6',
        newgreen: '#00E087',
        black: '#303030',
        grey: '#828282',
        lightgrey: '#EBEDE9',
        white: '#FFFAFF',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        hind: ['Hind', 'sans-serif'],
      },
      maxWidth: {
        screen: '100vw',
      },
      minWidth: {
        16: '16.666667%',
      },
      maxHeight: {
        32: '32rem',
      },
      height: {
        90: '90vh',
        50: '50vh',
        80: '80vh',
        83: '83vh',
        10: '10vh',
        7: '7vh',
        900: '90%',
        41.5: '41.5vh',
      },
      margin: {
        7: '7vh',
        10: '10vh',
      },
      minHeight: {
        90: '90vh',
        80: '80vh',
        83: '83vh',
      },
      spacing: {
        'vw-12': '12vw',
      },
      backgroundImage: {
        city: "url('/src/assets/greencity.webp')",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    darkTheme: false, // Désactive le thème sombre
  },
};
