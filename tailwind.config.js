module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      padding: {
        full: '100%',
      },
      backgroundImage: {
        'banner-overlay': `linear-gradient(45deg, rgba(0, 0, 0, 0.9), transparent)`,
      },
      colors: {
        primary: '#FF3D71',
        mainSection: '#222222',
        white80: '#D1D1D1',
      },
      animationDelay: {
        450: '450ms',
      },
      keyframes: {
        'loading-bounce': {
          to: { opacity: 0.1, transform: 'translateY(-1rem)' },
        },
        'flow-from-left': {
          from: { transform: 'translateX(-100%)' },
        },
        'flow-from-top': {
          from: { transform: 'translateY(-100%)' },
        },
        'fade-in': {
          from: { opacity: 0 },
        },
        'increase-height': {
          from: { maxHeight: '42px' },
          to: { maxHeight: '200px' },
        },
        'status-increase-height': {
          to: {
            maxHeight: '50px',
            opacity: '1',
          },
        },
      },
      animation: {
        'loading-bounce': 'loading-bounce 0.6s infinite alternate',
        'flow-from-left': 'flow-from-left 0.2s ease-out',
        'flow-from-top': 'flow-from-top 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease',
        'increase-height': 'increase-height 0.5s ease',
        'status-increase-height': 'status-increase-height 0.3s ease forward',
      },
      fontFamily: {
        khandy: 'Khandy Holand Regular',
        merri: "'Merriweather', serif",
      },
      boxShadow: {
        select: '0 0 5px 5px rgb(255, 61, 113, 0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-animation-delay'),
  ],
};
