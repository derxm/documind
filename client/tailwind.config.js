/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#171A2E',
          hover: '#222640',
          active: '#0F111F',
        },
        background: {
          DEFAULT: '#F8F9FC',
          subtle: '#F1F3F9',
        },
        accent: {
          DEFAULT: '#635BFF',
          hover: '#534BEA',
          active: '#453DD6',
          secondary: '#EEEAFE',
          'secondary-hover': '#E2DCFD',
        },
        text: {
          primary: '#202235',
          secondary: '#777B91',
          muted: '#9FA2B4',
        },
        border: {
          DEFAULT: '#E9EAF0',
          subtle: '#F2F3F8',
          focus: '#635BFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(23, 26, 46, 0.04), 0 1px 2px -1px rgba(23, 26, 46, 0.02)',
        card: '0 2px 8px -2px rgba(23, 26, 46, 0.05), 0 1px 4px -1px rgba(23, 26, 46, 0.03)',
        'card-hover': '0 12px 28px -4px rgba(23, 26, 46, 0.08), 0 4px 12px -2px rgba(23, 26, 46, 0.04)',
      },
    },
  },
  plugins: [],
};
