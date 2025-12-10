module.exports = {
  theme: {
    extend: {
      animation: {
        'slow-spin': 'slow-spin 60s linear infinite',
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 25s ease-in-out 5s infinite',
      },
      keyframes: {
        'slow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { 
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.6'
          },
          '25%': { 
            transform: 'translate(30px, -30px) scale(1.1)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translate(-20px, 20px) scale(0.9)',
            opacity: '0.7'
          },
          '75%': { 
            transform: 'translate(20px, 30px) scale(1.05)',
            opacity: '0.75'
          },
        },
      },
    },
  },
  plugins: [],
}