// tailwind.config.js

import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            'sans': [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Oxygen',
                    'Ubuntu',
                    'Cantarell',
                    'Open Sans',
                    'Helvetica Neue',
                    'sans-serif'
                ],
                roboto: ['Roboto', 'sans-serif']
            },
            colors: {
                'wine' : '#8B2326',
                'darkteal': '#1A4B4C',
                'burgundy': '#4A1E1F',
                'cream': '#D6C3A8',
                'teal': '#40898A',
                'lightgray': '#FAFAFA',
                'lightcream' : "E5E7EB",
                
            }
        },
    },
    plugins: []
  };
  