// #region vendor
// @ts-ignore
import VueMatomo from 'vue-matomo';
// #endregion
// #region internal
// #endregion

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  if (!config.public.MATOMO_URL || !config.public.MATOMO_SITE_ID) {
    return;
  }

  nuxtApp.vueApp.use(VueMatomo, {
    debug: true,
    host: config.public.MATOMO_URL,
    siteId: config.public.MATOMO_SITE_ID,
    router: nuxtApp.$router,
    enableHeartBeatTimer: true,
    heartBeatTimerInterval: 5,
    enableLinkTracking: true,
    requireConsent: false,
    trackInitialView: true,
    disableCookies: true,
    requireCookieConsent: false,
  });

  // @ts-ignore
  window._paq.push(['trackPageView']);
});
