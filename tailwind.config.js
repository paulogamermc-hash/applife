/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          text: {
            primary: '#FFFFFF',
            secondary: '#E0E0E0',
          },
        },
        // Light theme colors
        light: {
          bg: '#FFFFFF',
          surface: '#F5F5F5',
          text: {
            primary: '#212121',
            secondary: '#757575',
          },
        },
        // Attribute colors
        physical: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
        },
        mind: {
          DEFAULT: '#9C27B0',
          light: '#BA68C8',
        },
        career: {
          DEFAULT: '#FF9800',
          light: '#FFB74D',
        },
        social: {
          DEFAULT: '#E91E63',
          light: '#F06292',
        },
        // Accent colors
        accent: {
          blue: '#2196F3',
          green: '#4CAF50',
          purple: '#9C27B0',
          orange: '#FF9800',
          pink: '#E91E63',
          gold: '#FFC107',
        },
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 2px 4px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
