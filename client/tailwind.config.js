module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#78716c",

          "secondary": "#d97706",

          "accent": "#37CDBE",

          "neutral": "#0891b2",

          "base-100": "#FFFFFF",

          "info": "#facc15",

          "success": "#36D399",

          "warning": "#7c3aed",

          "error": "#fde68a",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
