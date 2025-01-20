/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        boldTextcolor: "#181A2A",
        blue: "#4B6BFB",
        grey: '#696A75',
        paraTextColor: "#3B3C4A",
        fadedBlueBackground: "rgba(75, 107, 251, 0.05)"
      },
      screens: {
        'md769': '769px',
        'sm600': '600px',
        'sm500': '500px',
        'sm426': '426px',
        'sm375': '376px', 
        'sm350': '350px', 
      },
      padding: {
        'p50': '12.5rem',
      },
      fontFamily: {
        'worksans': ["Work Sans", "serif"],
        'PlusJakarta': ["Plus Jakarta Sans", "serif"],
        'paraFont' : ["Source Serif", "serif"],
        'Roboto': ["Roboto", "serif"],
        'sfDisplay': ['"SF Pro Display"', 'sans-serif'],
        'sfRounded': ['"SF Pro Rounded"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite', 
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};