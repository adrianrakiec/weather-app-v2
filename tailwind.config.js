/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/components/**/*.{vue,js,ts}',
    './src/layouts/**/*.{vue,js,ts}',
    './src/pages/**/*.{vue,js,ts}',
    './src/plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFF',
    },
    aspectRatio: {
      '4/3': '4 / 3',
      '16/9': '16 / 9',
      '1/1': '1 / 1',
      auto: 'auto',
    },
    maxWidth: {
      none: 'none',
      full: '100%',
    },
    spacing: {
      0: '0px',
      '3xs': '2px',
      '2xs': '4px',
      xs: '8px',
      sm: '12px',
      base: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px',
    },
    maxWidth: {
      content: '1488px',
    },
    screens: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
