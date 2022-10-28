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
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
};
