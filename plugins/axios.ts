import axios from 'axios';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const http = axios.create({
    baseURL: config.public.apiBase,
    params: {
      appid: config.public.apiKey,
    },
  });

  return {
    provide: { http },
  };
});
