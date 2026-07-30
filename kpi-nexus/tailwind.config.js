/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0F1117',
          surface: '#1A1D27',
          elevated: '#22263A',
          border: '#2E3250',
        },
        text: {
          primary: '#F0F2FF',
          secondary: '#8B91B5',
          muted: '#4E5378',
        },
        accent: {
          blue: '#4F8EF7',
          teal: '#2ECFCF',
          amber: '#F5A623',
          red: '#F05252',
          purple: '#A78BFA',
          green: '#10B981',
        },
        domain: {
          financial: '#10B981',
          workforce: '#F43F5E',
          customer: '#6366F1',
          project: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        modal: '0 20px 60px rgba(0,0,0,0.6)',
        elevated: '0 4px 16px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        card: '12px',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.25s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
