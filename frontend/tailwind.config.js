/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // neon + surfaces
        'accent-1': '#12e0ff',
        'accent-2': '#ff2fa3',
        'bg-dark': '#05040b',
        'bg-dark-2': '#0b0f17',
        'surface-glass': 'rgba(255,255,255,0.03)',
        'surface-glass-light': 'rgba(255,255,255,0.85)',
        'muted-dark': 'rgba(255,255,255,0.65)',
        'muted-light': 'rgba(15,23,36,0.68)',
      },
      borderRadius: {
        neo: '14px',
      },
      boxShadow: {
        'neon-strong': '0 8px 30px rgba(18,224,255,0.18)',
        'neon-soft': '0 6px 20px rgba(255,47,163,0.08)',
        'glass-inner': 'inset 0 0 10px rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        'neo-gradient': 'linear-gradient(90deg,#12e0ff,#ff2fa3)',
        'neo-gradient-soft':
          'linear-gradient(90deg, rgba(18,224,255,0.12), rgba(255,47,163,0.12))',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
