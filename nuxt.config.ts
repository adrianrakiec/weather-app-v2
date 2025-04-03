// #region vendor
import { fileURLToPath } from 'url';
// #endregion
// #region internal
// #endregion

export default defineNuxtConfig({
  compatibilityDate: '2025-02-24',
  ssr: false,
  devtools: { enabled: false },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-16x16.png',
          sizes: '16x16',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-32x32.png',
          sizes: '32x32',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      API_APP: process.env.API_APP,
      API_USERS: process.env.API_USERS,
      API_USER_PROFILE: process.env.API_USER_PROFILE,
      API_FILES: process.env.API_FILES,
      API_NOTIFICATIONS: process.env.API_NOTIFICATIONS,
      IDENTITY_AUTHORITY_URL: process.env.IDENTITY_AUTHORITY_URL,
      IDENTITY_CLIENT_ID: process.env.IDENTITY_CLIENT_ID,
      IDENTITY_CLIENT_SECRET: process.env.IDENTITY_CLIENT_SECRET,
      IDENTITY_CLIENT_SCOPE: process.env.IDENTITY_CLIENT_SCOPE,
      MATOMO_URL: process.env.MATOMO_URL,
      MATOMO_SITE_ID: process.env.MATOMO_SITE_ID,
      CONFIG_APP_REDIRECT_DELAY_MS:
        process.env.CONFIG_APP_REDIRECT_DELAY_MS || '3000',
      BASE_TENANT_NAME: process.env.BASE_TENANT_NAME,
      SINGLE_TENANT_SUFFIX: process.env.SINGLE_TENANT_SUFFIX,
      NOTIFICATIONS_APPLICATIONS: process.env.NOTIFICATIONS_APPLICATIONS,
      PRODUCT_NAME: process.env.PRODUCT_NAME,
      IS_MULTITENANT_ENABLED: process.env.IS_MULTITENANT_ENABLED,
      ////////////////
      apiBase: process.env.WEATHER_API_BASE,
      apiKey: process.env.WEATHER_API_KEY,
    },
  },
  alias: {
    '@components': fileURLToPath(new URL('components', import.meta.url)),
    '@pages': fileURLToPath(new URL('pages/[tenant]', import.meta.url)),
    '@utils': fileURLToPath(new URL('utils', import.meta.url)),
    '@types': fileURLToPath(new URL('types', import.meta.url)),
    '@stores': fileURLToPath(new URL('stores', import.meta.url)),
    '@public': fileURLToPath(new URL('public', import.meta.url)),
    '@config': fileURLToPath(new URL('config', import.meta.url)),
  },
  components: [{ path: '~/components' }],
  plugins: ['~/plugins/pinia'],
  imports: {
    dirs: [
      'composables',
      'utils',
      'paths',
      'services',
      'stores',
      'dictionary',
      'plugins',
      'middleware',
    ],
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'dayjs-nuxt',
  ],
  i18n: {
    vueI18n: './config/i18n/config.ts',
    detectBrowserLanguage: false,
  },
  dayjs: {
    locales: ['pl', 'en'],
    plugins: [
      'relativeTime',
      'utc',
      'timezone',
      // ant design compatibility
      'weekday',
      'localeData',
      'quarterOfYear',
      'weekYear',
      'weekOfYear',
      'advancedFormat',
      'customParseFormat',
    ],
    defaultLocale: 'pl',
    defaultTimezone: 'Europe/Warsaw',
  },
  typescript: {
    strict: false,
    typeCheck: false,
  },
  googleFonts: {
    families: {
      Inter: [400, 600],
    },
    preload: true,
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    viewer: false,
  },
});
